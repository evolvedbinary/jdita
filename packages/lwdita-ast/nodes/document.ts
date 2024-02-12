import { Visitor } from "@jdita/lwdita-xml/visitor";
import { BaseNode } from "./base";
import { stringToChildTypes } from "@jdita/lwdita-xml/utils";

/**
 * The `document` node is the root node of the document tree and the entry point for the parser
 *
 * @example
 * ```xml
 * <document>
 *   <topic/>
 * </document>
 * ```
 */
export class DocumentNode extends BaseNode {
  static nodeName = 'document';
  static childTypes = stringToChildTypes(['topic']);
  static fields = [];
  static isValidField = (): boolean => true;

  /** @override */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accept(visitor: Visitor, depth: number, indent: boolean): void {
    //don't start the tag for document node
    this._children?.forEach(child => child.accept(visitor, depth, indent));
  }
}