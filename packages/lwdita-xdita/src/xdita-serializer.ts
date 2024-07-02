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

import { AbstractBaseNode, CDataNode, DocumentNode, TextNode } from "@evolvedbinary/lwdita-ast";
import { TextSimpleOutputStream } from "./stream";

/**
 * Serializer for XDITA.
 * Takes an AST and serializes it to XDITA.
 */
export class XditaSerializer {
  outputStream: TextSimpleOutputStream;
  indent: boolean;
  tabSize: number;
  indentation: string;
  EOL: string;
  depth = 0;

  /**
   * Constructor
   *
   * @param outputStream - The output stream.
   * @param indent - enable indentation
   * @param indentation - the character (or string) to use as the indent
   * @param tabSize - size of the tab, only used when the `indentation` is not a `\t` character.
   */
  constructor(outputStream: TextSimpleOutputStream, indent = false, indentation = " ", tabSize = 4) {
    this.outputStream = outputStream;
    this.indent = indent;
    this.tabSize = tabSize;
    this.indentation = indentation;
    if(indentation === '\t') {
      this.tabSize = 1;
    }
    this.EOL = '\n';
  }

  /**
   * Serialize the indentation to the output stream
   */
  private serializeIndentation(): void {
    if (this.indent) {
      this.outputStream.emit(this.indentation.repeat(this.depth * this.tabSize));
    }
  }

  /**
   * Serialize the End of Line character to the output stream
   */
  private serializeEOL(): void {
    if (this.indent) {
      this.outputStream.emit(this.EOL);
    }
  }

  /**
   * Serialize a document node to the output stream.
   *
   * @param node - the document node to serialize
   */
  private serializeDocument(node: DocumentNode): void {
    // a document node has no string representation, so move on to its children
    node.children.forEach(child => this.serialize(child));
  }

  /**
   * Serialize an element node to the output stream.
   *
   * @param node - the element node to serialize
   */
  private serializeElement(node: AbstractBaseNode): void {
    // serialize the start of the element start tag
    this.outputStream.emit(`<${node.static.nodeName}`);
    // serialize the attributes
    this.serializeAttributes(node);
    if (node.children?.length) {
      // as the element has children or attributes, serialize the remainder of the element start tag
      this.outputStream.emit(`>`);
      this.serializeEOL();
      // increment the depth after starting an element
      this.depth++;
      // visit the element's children
      node.children.forEach(child => this.serialize(child));
      // decrement the depth after serializing the elements children
      this.depth--;
      this.serializeIndentation();
      this.outputStream.emit(`</${node.static.nodeName}>`);
    } else {
      // element has no attributes or children, so the remainder of the element start tag as a self-closing element
      this.outputStream.emit(`/>`);
    }
  }

  /**
   * Serialize the attributes to the output stream
   *
   * @param node - the node to serialize the attributes of
   */
  private serializeAttributes(node: AbstractBaseNode): void {
    let attrsStr = '';
    const props = node.getProps();
    if (props) {
      const attr = props as Record<string, string>;
      attrsStr = Object.keys(props).filter(key => attr[key]).map(key => `${key}="${attr[key]}"`).join(' ');
    }
    if (attrsStr.length) {
      attrsStr = ` ${attrsStr}`;
    }
    this.outputStream.emit(attrsStr);
  }

  /**
   * Serialize the text content of the text node to the output stream
   *
   * @param node - the text node to serialize the content of
   */
  private serializeText(node: TextNode): void {
    const props = node.getProps();
    if (props['content']) {
      this.outputStream.emit(String(props['content']));
    }
  }

  /**
   * Serialize the content of cdata to the output stream
   *
   * @param node - the node to serialize the content of
   */
    private serializeCData(node: TextNode): void {
      const props = node.getProps();
      if (props['content']) {
        const cdataOpen = `<![CDATA[`;
        const cdataClose = `]]>`;
        this.outputStream.emit(cdataOpen + String(props['content']) + cdataClose);
      }
    }

  /**
   * Visit a node and serialize it to the output stream
   *
   * @param node - the node to serialize
   */
  serialize(node: AbstractBaseNode): void {
    if (node instanceof DocumentNode) {
      this.serializeDocument(node);
      // close the output stream as we have now serialized the document
      this.outputStream.close();

    } else {
      // serialize any indentation
      this.serializeIndentation();

      if (node instanceof TextNode) {
        // if the node is a text node, serialize its text content
        this.serializeText(node);

      } else if (node instanceof CDataNode) {
        // if the node is a text node, serialize its text content
        this.serializeCData(node);

      } else {
        // TODO(AR) ideally we should have `node instanceof ElementNode` type guard here
        this.serializeElement(node);
      }

      // serialize any EOL
      this.serializeEOL();
    }
  }
}
