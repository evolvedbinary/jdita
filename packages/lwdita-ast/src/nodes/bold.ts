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
 * Define all allowed `bold` attributes:
 * `dir`, `xml:lang`, `translate`, `keyref`, `outputclass`, `class`
 */
export const BoldFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface BoldNode defines the attribute types for `bold`
 */
export interface BoldNodeAttributes extends LocalizationNodeAttributes, VariableContentNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `bold` node are valid and match this list:
 * @See {@link BoldFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidBoldField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `bold` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `bold` node to test
 * @returns Boolean
 */
export const isBoldNode = (value?: unknown): value is BoldNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(BoldFields, value as Record<string, BasicValue>, isValidBoldField);

/**
 * Construct a `bold` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `bold` node
 * */
export function makeBold<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

/**
 * Create a `bold` node (link) and map the `bold` node with the LwDita tag name `b`
 *
 * @decorator `@makeComponent`
 * @param makeBold - The `Bold` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidBodyField - A boolean value, if the attribute is valid or not
 * @param BodyFields - An array containing all valid attribute names
 * @param childNodes - An Array of allowed child nodes `text`, `ph`, `xref`
*/
@makeComponent(makeBold, 'b', isValidBoldField, BoldFields, ['%inline.noimage*'])
export class BoldNode extends AbstractBaseNode implements BoldNodeAttributes {
  static domNodeName = 'b';

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