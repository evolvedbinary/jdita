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

import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNodeAttributes, isValidClassField, makeClass } from "./class";
import { areFieldsValid, isOrUndefined } from "../utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll } from "./base";
import { BasicValue } from "../classes";
import { CDATA, isCDATA } from "../ast-classes";

/**
 * Define all allowed `othermeta` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `name`, `content`
 */
export const OthermetaFields = [...LocalizationFields, 'name', 'content', 'class'];

/**
 * Interface OthermetaNode defines the attribute types for `othermeta`:
 */
export interface OthermetaNodeAttributes extends LocalizationNodeAttributes, ClassNodeAttributes, BaseNode {
  'name': CDATA
  'content': CDATA
  'class': CDATA
}

/**
 * Check if the given attributes of the `othermeta` node are valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export function isValidOthermetaField(field: string, value: BasicValue): boolean {
  if (isValidLocalizationField(field, value) || isValidClassField(field, value)) {
    return true;
  }
  switch(field) {
    case 'name': return isOrUndefined(isCDATA, value);
    case 'content': return isOrUndefined(isCDATA, value);
    case 'class': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `Othermeta` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `Othermeta` node to test
 * @returns Boolean
 */
export const isOthermetaNode = (value?: unknown): value is OthermetaNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(OthermetaFields, value as Record<string, BasicValue>, isValidOthermetaField);

/**
 * Construct a `othermeta` node with all available attributes
 *
 * @remarks
 * Element `othermeta` requires only a class attribute,
 * not an `outputclass` attribute, therefore it has been
 * added here instead of importing `ClassFields`
 *
 * @param constructor - The constructor
 * @returns A `othermeta` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeOthermeta<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T  {
  return makeAll(class extends constructor {
    get 'name'(): CDATA {
      return this.readProp<CDATA>('name'); }
    set 'name'(value: CDATA) {
        this.writeProp<CDATA>('name', value); }
    get 'content'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('content'); }
    set 'content'(value: CDATA | undefined) {
        this.writeProp<CDATA | undefined>('content', value); }
    get 'class'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('class'); }
    set 'class'(value: CDATA | undefined) {
        this.writeProp<CDATA | undefined>('class', value); }
  }, makeLocalization, makeClass,);
}

/**
 * Create a `othermeta` node (Other Metadata)
 *
 * @decorator `@makeComponent`
 * @param makeOthermeta - The `Othermeta` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidOthermetaField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes, @see {@link OthermetaFields}
 */
@makeComponent(makeOthermeta, 'othermeta', isValidOthermetaField, OthermetaFields)
export class OthermetaNode extends AbstractBaseNode implements OthermetaNodeAttributes {

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // OthermetaNodeAttributes
  'name': CDATA
  'content': CDATA
  'class': CDATA
}