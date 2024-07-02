/*!
Copyright (C) 2020 Evolved Binary

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import * as saxes from "@rubensworks/saxes";
import { BaseNode, DocumentNode, JDita } from "@evolvedbinary/lwdita-ast";
import { createNode } from "./factory";
import { InMemoryTextSimpleOutputStreamCollector } from "./stream";
import { XditaSerializer } from "./xdita-serializer";

/** TODO: Add tests for this module */

/**
 * Converts XML to an AST document tree
 *
 * @param xml - XML string
 * @param abortOnError - If true, abort on error
 * @returns - Promise of a DocumentNode
 */
export async function xditaToAst(xml: string, abortOnError = true): Promise<DocumentNode> {
  return new Promise((resolve, reject) => {
    const errors: Error[] = [];
    // Create a Parser Object
    const parser = new saxes.SaxesParser({
      xmlns: true,
      fragment: false,
      position: true
    });

    // simple regex to detemine if string is only whitespace
    const wsRegEx = new RegExp("^\\s+$");

    // Create a new document node
    const doc = new DocumentNode();

    // Create an array of Document nodes (type BaseNode)
    const stack: BaseNode[] = [doc];

    // Parse the text and add a new node item to the node-array
    // `text` is the content of any text node in the parsed xml document
    parser.on("text", function (text) {
      const parentNode = stack[stack.length - 1];
      const node: BaseNode = createNode(text);

      // if the 'text' string is only whitespace characters,
      // and the parent node cannot accept a text node (i.e. it does not support #PCDATA),
      // then the whitespace is non-significant as far as the DTD is concerned... so just discard it!
      // see: https://github.com/evolvedbinary/lwdita/issues/129#issuecomment-2150243338
      if (wsRegEx.test(text) && !parentNode.canAdd(node)) {
        return;
      }
      // add the text node to the parent
      stack[stack.length - 1].add(node, abortOnError);
    });

    // Look for the first open tag `<` and add the node to the array
    /**
     * `node` is the node object
     * @example
     * ```json
     * node {
     *   name: 'topic',
     *   attributes: [Object: null prototype] {
     *     id: {
     *       name: 'id', prefix: '',
     *       local: 'id', value: 'topicID', uri: ''
     *     }
     *   },
     *   ns: [Object: null prototype] {},
     *   prefix: '',
     *   local: 'topic',
     *   uri: '',
     *   isSelfClosing: false
     * }
     * ```
     * @example
     * The `obj` is an object containing all the node's corresponding properties like
     * ```json
     * obj _a: { _props: { id: 'topicID', 'xml:lang': undefined,... }}
     * ```
     */
    parser.on("opentag", function (node: saxes.SaxesTagNS) {
      try {
        const obj = createNode(node);
        stack[stack.length - 1].add(obj, abortOnError);
        stack.push(obj);
      } catch (e) {
        console.log('invalid:', e);
      }
    });

    // Look for the close tag `>` and delete the node from the array
    parser.on("closetag", function () {
      stack.pop();
    });

    parser.on("cdata", (cdata) => {
      try {        
        const obj = createNode(cdata, true);
        stack[stack.length - 1].add(obj, abortOnError);

      } catch (e) {
        console.log('invalid:', e);
      }
    })

    // return the document tree if run without errors
    parser.on("end", function () {
      if (errors.length && abortOnError) {
        reject(errors);
      } else {
        resolve(doc);
      }
    });

    parser.on("error", function (e) {
      errors.push(e);
    });

    // process the xml using the parser
    parser.write(xml).close();
  });
}

/**
 * Convert the document tree to JDita object
 *
 * @param xml - The XML input as string
 * @param abortOnError - Boolean, if true, stop execution and report errors
 * @returns JDita object
 */
export async function xditaToJdita(xml: string, abortOnError = true): Promise<JDita> {
  return xditaToAst(xml, abortOnError).then(astToJdita);
}

/**
 * Convert the document node to JDita object
 * 
 * @param document - DocumentNode
 * @returns JDita object
 */
export function astToJdita(document: DocumentNode): JDita {
  return document.json;
}

/**
 * `serializeToXML` - Serialize the AST and transform it into XDITA
 * The serialization is providing three options to output the document:
 * 1. No indentation/formatting - all is output in one line (default)
 * 2. Indentation with tabs
 * 3. Indentation with Spaces - You can modify the desired number of spaces by setting `indentationSize`, per default it's set to 4 spaces.
 *
 * @example
 * ```
 * // 1. No formatting
 *    serializeToXML(result);
 * // 2. Indentation with tabs
 *    serializeToXML(result, '\t');
 * // 3. Indentation with Spaces
 *    serializeToXML(result, ' ', 4);
 * ```
 *
 * @param root - The document root
 * @param indentationChar - The indentation character to be used (tabs or spaces). If none is provided, no indentation is used.
 * @param tabSize - The number of spaces to be used for indentation when an indentation character other than tab is used, the default is 4 spaces
 * @returns The transformed document as an array of XMLTag objects
 */
export function serializeToXdita(root: DocumentNode, indentationChar?: string, tabSize?: number): string {
  const outStream = new InMemoryTextSimpleOutputStreamCollector();
  let visitor: XditaSerializer;
  if(indentationChar === '\t') {
    visitor = new XditaSerializer(outStream, true, '\t');
  } else if (indentationChar) {
    tabSize = tabSize ? tabSize : 4;
    visitor = new XditaSerializer(outStream, true, indentationChar, tabSize);
  } else {
    visitor = new XditaSerializer(outStream,false);
  }
  visitor.serialize(root);

  return outStream.getText();
}
