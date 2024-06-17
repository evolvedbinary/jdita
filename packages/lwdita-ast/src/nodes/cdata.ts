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

import { AbstractBaseNode, BaseNode, makeComponent } from "./base";
import { isOrUndefined } from "../utils";
import { JDita } from "../ast-classes";
import { BasicValue } from "../classes";

/**
 * The valid fields for the CDataNode.
 */
export const CDataFields = ['content'];

/**
 * Interface CDataNodeAttributes defines the attributes for the CDataNode.
 */
export interface CDataNodeAttributes extends BaseNode {
  'content'?: string
}

/**
 * Check if the attribute `content` of the `CDataNode` is valid.
 *
 * @param field - The name of the attribute.
 * @param value - The value of the attribute.
 * @returns A boolean indicating if the attribute is valid.
 */
export function isValidCDataField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'content': return isOrUndefined(content => typeof content === 'string', value);
    default: return false;
  }
}

/**
 * Check if the `CDataNode` is valid.
 *
 * @remarks
 * Assert that the CDataNode is an object, has content,
 * and that the content is of type `string`.
 *
 * @param value - The CDataNode to test.
 * @returns A boolean indicating if the CDataNode is valid.
 */
export const isCDataNode = (value?: unknown): value is CDataNodeAttributes =>
  typeof value === 'object' && !!value && 'content' in value && typeof value.content === 'string';

/**
 * Construct a `CDataNode` containing a `content` property.
 *
 * @param constructor - The constructor.
 * @returns The `CDataNode`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeCData<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return class extends constructor implements CDataNode {
    get 'content'(): string {
      return this.readProp('content');
    }
    set 'content'(value: string) {
      this.writeProp('content', value);
    }
  }
}

/**
 * Create a `CDataNode` containing a text content.
 *
 * @decorator `@makeComponent`
 * @param makeCData - The `CDataNode` constructor.
 * @param nodeName - The name of the node.
 * @param isValidTextField - A boolean value indicating if the attribute is valid or not.
 * @param fields - The valid attribute `content` of type string.
 */
@makeComponent(makeCData, 'cdata', isValidCDataField, CDataFields)
export class CDataNode extends AbstractBaseNode implements CDataNodeAttributes {

  // CDataNodeAttributes {
  'content'?: string

  constructor(content: string) {
    super({ content });
  }
  get json(): JDita {
    return {
      nodeName: this.static.nodeName,
      content: this._props['content'] as string,
    };
  }
}