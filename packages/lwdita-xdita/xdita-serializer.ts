import { BaseNode, DocumentNode, TextNode } from "@evolvedbinary/lwdita-ast";
import { SimpleTextStream } from "./stream";

/**
 * Serializer for XDITA.
 * Takes an AST and serializes it to XDITA.
 */
export class XditaSerializer {
  outputStream: SimpleTextStream;
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
   * @param tabSize - size of the tab, only used when the `indentation` is not a '\t character.
   */
  constructor(outputStream: SimpleTextStream, indent = false, indentation = " ", tabSize = 4) {
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
  serializeIndentation(): void {
    if (this.indent) {
      this.outputStream.emit(this.indentation.repeat(this.depth * this.tabSize));
    }
  }

  /**
   * Serialize the End of Line character to the output stream
   */
  serializeEOL(): void {
    if (this.indent) {
      this.outputStream.emit(this.EOL);
    }
  }

  /**
   * Serialize the attributes to the output stream
   *
   * @param node the node to serialize the attributes of
   */
  serializeAttributes(node: BaseNode): void {
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
   * @param node the text node to serialize the content of
   */
  serializeText(node: TextNode): void {
    const props = node.getProps();
    if (props['content']) {
      this.outputStream.emit(String(props['content']));
    }
  }

  /**
   * Visit a node and serialize it to the output stream
   *
   * @param node the node to serialize
   */
  serialize(node: BaseNode): void {
    if (node instanceof DocumentNode) {
      // do not serialize anything if the node is a document node, move on to its children
      node.children.forEach(child => this.serialize(child));
      // close the output stream as we have now serialized the document
      this.outputStream.close();
    } else {
      // serialize any indentation
      this.serializeIndentation();

      if (node instanceof TextNode) {
        // if the node is a text node, serialize its text content
        this.serializeText(node);
      } else {
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
      this.serializeEOL();
    }
  }
}