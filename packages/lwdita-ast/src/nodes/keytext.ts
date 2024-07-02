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
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `keytext` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`
 */
export const KeytextFields = [...LocalizationFields, ...ClassFields];

/**
 * Interface KeytextNodeAttributes defines the attribute type for `keytext`: `CDATA`
 */
export interface KeytextNodeAttributes extends LocalizationNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `keytext` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidKeytextField = (field: string, value: BasicValue): boolean =>
  isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `keytext` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `keytext` node to test
 * @returns Boolean
 */
export const isKeytextNode = (value?: unknown): value is KeytextNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(KeytextFields, value as Record<string, BasicValue>, isValidKeytextField);

/**
 * Construct a `keytext` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `keytext` node
 */
export function makeKeytext<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeClass);
}

/**
 * Create a `keytext` node (Key text)
 *
 * @decorator `@makeComponent`
 * @param makeKeytext - The `keytext` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidKeytextField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link KeytextFields}
 * @param childNodes - An Array of allowed child node (`text` or `ph`)
 */
@makeComponent(makeKeytext, 'keytext', isValidKeytextField, KeytextFields, [['text*', '%ph*']])
export class KeytextNode extends AbstractBaseNode implements KeytextNodeAttributes {
  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA
}