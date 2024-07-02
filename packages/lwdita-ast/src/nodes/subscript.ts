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

import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "../utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, VariableContentNodeAttributes, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { BasicValue } from "../classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `subscript` (Subscript content) attributes:
 * `dir`, `xml:lang`, `translate`, `keyref`, `outputclass`, `class`
 */
export const SubscriptFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface SubscriptNodeAttributes defines the attribute types for `subscript`:
 */
export interface SubscriptNodeAttributes extends LocalizationNodeAttributes, VariableContentNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `subscript` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidSubscriptField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `subscript` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `subscript` node to test
 * @returns Boolean
 */
export const isSubscriptNode = (value?: unknown): value is SubscriptNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(SubscriptFields, value as Record<string, BasicValue>, isValidSubscriptField);

/**
 * Construct a `subscript` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `subscript` node
 */
export function makeSubscript<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

/**
 * Create a `subscript` node and map the `subscript` node with the LwDita tag name `sb`
 *
 * @decorator `@makeComponent`
 * @param makeSubscript - The `subscript` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidSubscriptField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link SubscriptFields}
 * @param childNodes - An Array of allowed child nodes `text`, `ph`, `xref`
 */
@makeComponent(makeSubscript, 'sub', isValidSubscriptField, SubscriptFields, ['%inline.noimage*'])
export class SubscriptNode extends AbstractBaseNode implements SubscriptNodeAttributes {
  static domNodeName = 'sub'

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // VariableContentNodeAttributes
  'keyref'?: CDATA

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA
}