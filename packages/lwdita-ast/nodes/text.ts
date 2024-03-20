import { BaseNode, makeComponent } from "./base";
import { isOrUndefined } from "@jdita/lwdita-xml/utils";
import { BasicValue, JDita } from "@jdita/lwdita-xml/classes";

/**
 * Define the allowed `text` attribute:
 * The only allowed field is `content`
 */
export const TextFields = ['content'];

/**
 * Interface TextNode defines the `content` field type for node `text`: `string`
 */
export interface TextNode {
  'content'?: string;
}

/**
 * Check if the attribute `content` of the `text` node is valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export function isValidTextField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'content': return isOrUndefined(content => typeof content === 'string', value);
    default: return false;
  }
}

/**
 * Check if the `text` node is valid
 *
 * @remarks
 * Assert that the text node is an object, has content,
 * and that the content meets the required type `string`.
 *
 * @param value - A BasicValue-typed value containing the field value
 * @returns
 */
export const isTextNode = (value?: BasicValue): value is TextNode =>
  typeof value === 'object' && 'content' in value && typeof value.content === 'string';


/**
 * Construct a `text` node containing a `content` property
 *
 * @param constructor - The constructor
 * @returns The `text` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeText<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements TextNode {
    get 'content'(): string {
      return this.readProp('content');
    }
    set 'content'(value: string) {
      this.writeProp('content', value);
    }
  }
}

/**
 * Create a `text` node containing a text content
 *
 * @decorator `@makeComponent`
 * @param makeText - The `text` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidTextField - A boolean value, if the attribute is valid or not
 * @param fields - The valid attribute `content` of type string See {@link TextFields}
 */
@makeComponent(makeText, 'text', isValidTextField, TextFields)
export class TextNode extends BaseNode {
  constructor(content: string) {
    super({ content });
  }
  get json(): JDita {
    return {
      nodeName: this.static.nodeName,
      content: this._props['content'] as string,
    };
  }

  /**
   * Override the `accept` method of the `BaseNode` class
   *
   * @param visitor - The accepted visitor
   * @param depth - The node's level within the document tree, needed for indentation
   * @param indent - Boolean, if the indentation of the output is set or not
   */
  /** @override */
  accept(visitor: any, depth = 0, indent: boolean): void {
    const textContent = this._props['content'] as string;
    // Indentation: 2 single spaces per level
    const tab = `  `;
    const indentation = indent ? tab.repeat(depth) : '';
    const lineEnd = indent ? '\n' : '';
    visitor.visit(indentation + textContent + lineEnd);
  }
}