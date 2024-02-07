import { BasicValue } from "@jdita/lwdita-xml/classes";

/**
 * Create XML tags
 *
 * @remarks
 * Return start tag, the element name
 * available attributes, an end tag.
 * In case of selfclosing elements, return
 * a selfclosing tag.
 * Indent the tags by inserting
 * 2 spaces per level according to the element's nesting level.
 *
 * @example
 * Selfclosing tag: `<ph keyref="product-name"/>`
 *
 * @example
 * Start tag with attribute: `<p id="warning">`
 *
 * @example
 * End tag: `</topic>`
 */
export class XMLTag {
  tagName: string;
  attributes?: Record<string, BasicValue>;
  isSelfClosing: boolean;
  isStartTag: boolean;
  depth: number;
  indent: boolean;

  constructor(
    tagName: string,
    attributes: Record<string,
    BasicValue>,
    depth: number,
    isSelfClosing: boolean,
    isStartTag: boolean,
    indent: boolean
  ){
    this.tagName = tagName;
    this.attributes = attributes;
    this.depth = depth;
    this.isSelfClosing = isSelfClosing;
    this.isStartTag = isStartTag;
    this.indent = indent;
  }

  toString(): string {
    const attrsPrint = Object.keys(this.attributes).filter(key => this.attributes[key]).map(key => `${key}="${this.attributes[key]}"`).join(' ');
    // Indentation: 2 single spaces per level
    const tab = `  `;
    const indentation = this.indent ? tab.repeat(this.depth) : '';
    const lineEnd = this.indent ? '\n' : '';

    // Handle selfclosing elements
    if (this.isSelfClosing) {
      return indentation + (attrsPrint ? `<${this.tagName} ${attrsPrint}/>` : `<${this.tagName}/>`) + lineEnd;
    }

    // Handle start tags
    if (this.isStartTag) {
      return indentation + (attrsPrint ? `<${this.tagName} ${attrsPrint}>` : `<${this.tagName}>`) + lineEnd;
    }

    // Handle end tags
    if(!this.isStartTag) {
      return indentation +  `</${this.tagName}>` + lineEnd;
    }
   }
}

/**
 * Visitor class for traversing the AST
 */
export class Visitor {
  //TODO change this an array or any kind of method for saving the output
  outStream: Array<XMLTag>;

  //tageNames array for saving the tag names
  tagsStack: Array<string>;

  /**
   * Constructor
   * @param outStream the output stream
   */
  constructor(outStream: Array<XMLTag>) {
    this.outStream = outStream;
    this.tagsStack = [];
  }

  /**
   * Visit a node
   * @param text
   */
  visit(text: XMLTag) {
    this.outStream.push(text);
  }

  /**
   * StartTag event
   *
   * @param tagName the tag name
   * @param attrs the attributes
   */
  startTag(
    tagName: string,
    attrs: any, depth,
    isSelfClosing = false,
    isStartTag = true,
    indent: boolean
  ) {
    // create a new XMLTag object
    const xmlTag = new XMLTag(tagName, attrs, depth, isSelfClosing , isStartTag, indent);
    // push to the output stream
    this.outStream.push(xmlTag);
    // save the tag in the stack to use it later
    this.tagsStack.push(tagName);
  }

  /**
   * EndTag event
   */
  endTag(
    depth,
    isSelfClosing = false,
    isStartTag = false,
    indent: boolean
  ) {
    // get the tag out of the stack
    const tagName = this.tagsStack.pop();
    // create a new XMLTag object
    const xmlTag = new XMLTag(tagName, {}, depth, isSelfClosing, isStartTag, indent);
    // add the closing tag to the output stream
    this.outStream.push(xmlTag);
  }

  selfClosingTag(
    tagName: string,
    attrs: any,
    depth,
    isSelfClosing = true,
    isStartTag = true,
    indent: boolean
  ) {
    // create new self closing tag
    const xmlTag = new XMLTag(tagName, attrs, depth, isSelfClosing, isStartTag, indent);
    // push to the output stream
    this.outStream.push(xmlTag);
  }
}