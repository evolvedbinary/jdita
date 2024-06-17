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

// this is a temporary fix to serialize the JDita tree to XDita by by YB, signed-off by AR.
import { TextSimpleOutputStream } from "./stream";
import { JDita } from "@evolvedbinary/lwdita-ast"

/**
 * Serializer for XDITA.
 * Takes an Jdita and serializes it to XDITA.
 */
export class JditaSerializer {
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
   * Serialize a jdita element to the output stream.
   *
   * @param jdita - the element to serialize
   */
  private serializeJDitaElement(jdita: JDita): void {
    // serialize the start of the element start tag
    this.outputStream.emit(`<${jdita.nodeName}`);
    // serialize the attributes
    this.serializeAttributes(jdita);
    if (jdita.children?.length) {
      // as the element has children or attributes, serialize the remainder of the element start tag
      this.outputStream.emit(`>`);
      this.serializeEOL();
      // increment the depth after starting an element
      this.depth++;
      // visit the element's children
      jdita.children.forEach(child => this.serializeFromJdita(child));
      // decrement the depth after serializing the elements children
      this.depth--;
      this.serializeIndentation();
      this.outputStream.emit(`</${jdita.nodeName}>`);
    } else {
      // element has no attributes or children, so the remainder of the element start tag as a self-closing element
      this.outputStream.emit(`/>`);
    }
  }

  /**
   * Serialize the attributes to the output stream
   *
   * @param jdita - the node to serialize the attributes of
   */
  private serializeAttributes(jdita: JDita): void {
    let attrsStr = '';
    const props = jdita.attributes;
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
   * Travel Jdita tree and serialize it to the output stream
   *
   * @param jdita - the Jdita tree to serialize
   */
  serializeFromJdita(jdita: JDita): void {
    if (jdita.nodeName === 'document') {

      jdita.children?.forEach(child => this.serializeFromJdita(child));

      // close the output stream as we have now serialized the document
      this.outputStream.close();

    } else {
      // serialize any indentation
      this.serializeIndentation();

      if (jdita.nodeName === 'text') {
        // if the node is a text node, serialize its text content
        if (jdita.content) {
          this.outputStream.emit(String(jdita.content));
        }

      } else if (jdita.nodeName === "cdata") {
        // if the node is a cdata node, serialize its content and wrap it with the cdata
        const cdataOpen = `<![CDATA[`;
        const cdataClose = `]]>`;
        this.outputStream.emit(cdataOpen + String(jdita.content) + cdataClose);
      } else {
        this.serializeJDitaElement(jdita);
      }

      // serialize any EOL
      this.serializeEOL();
    }
  }
}
