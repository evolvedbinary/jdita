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
import { VariableContentNodeAttributes, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "../utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `tt` (Teletype content) fields:
 * `dir`, `xml:lang`, `translate`, `keyref`, `outputclass`, `class`
 */
export const TtFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface `TtNodeAttributes` defines the attribute types for `tt`:
 */
export interface TtNodeAttributes extends LocalizationNodeAttributes, VariableContentNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given fields of the `tt` node are valid and matches this list:
 * `keyref`, `outputclass`, `class`, `dir`, `xml:lang`, `translate`
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidTtField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `tt` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `tt` node to test
 * @returns Boolean
 */
export const isTtNode = (value?: unknown): value is TtNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(TtFields, value as Record<string, BasicValue>, isValidTtField);

/**
 * Construct an `tt` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `tt` node
 */
export function makeTt<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

/**
 * Create a `tt` node
 *
 * @decorator `@makeComponent`
 * @param makeTt - The `tt` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidEmField - A boolean value, if the field is valid or not
 * @param fields - A List of valid fields
 * @param childNodes - An Array of allowed child nodes `text`, `ph`, `xref`
 */
@makeComponent(makeTt, 'tt', isValidTtField, TtFields, ['%inline.noimage*'])
export class TtNode extends AbstractBaseNode implements TtNodeAttributes {

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