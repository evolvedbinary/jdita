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
 * Define all allowed `underlined` attributes:
 * `dir`, `xml:lang`, `translate`, `keyref`, `class`, `outputclass`
 */
export const UnderlinedFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface UnderlinedNodeAttributes defines the attribute types for `underlined`:
 */
export interface UnderlinedNodeAttributes extends LocalizationNodeAttributes, VariableContentNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `underlined` node are valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export const isValidUnderlinedField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `underlined` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `underlined` node to test
 * @returns Boolean
 */
export const isUnderlinedNode = (value?: unknown): value is UnderlinedNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(UnderlinedFields, value as Record<string, BasicValue>, isValidUnderlinedField);

/**
 * Construct an `underlined` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `underlined` node
 */
export function makeUnderlined<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

/**
 * Create an `underlined` node and map the `underlined` node with the LwDita tag name `u`
 *
 * @decorator `@makeComponent`
 * @param makeUnderlined - The `underlined` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidUnderlinedField - A boolean value, if the attributes is valid or not
 * @param fields - A List of valid attributes @See {@link UnderlinedFields}
 * @param childNodes - An Array of allowed child nodes `text`, `ph`, `xref`
 */
@makeComponent(makeUnderlined, 'u', isValidUnderlinedField, UnderlinedFields, ['%inline.noimage*'])
export class UnderlinedNode extends AbstractBaseNode implements UnderlinedNodeAttributes {
  static domNodeName = 'u'

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