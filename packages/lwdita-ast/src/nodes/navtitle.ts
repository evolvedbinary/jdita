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
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "../utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `navtitle` (Navigation title) fields:
 * `dir`, `xml:lang`, `translate`, `outputclass`, `class`
 */
export const NavtitleFields = [...LocalizationFields, ...ClassFields];

/**
 * Interface `NavtitleNodeAttributes` defines the attribute types for `navtitle`:
 */
export interface NavtitleNodeAttributes extends LocalizationNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given fields of the `navtitle` node are valid and matches this list:
 * `dir`, `xml:lang`, `translate`, `outputclass`, `class`
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidNavtitleField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `navtitle` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `navtitle` node to test
 * @returns Boolean
 */
export const isNavtitleNode = (value?: unknown): value is NavtitleNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(NavtitleFields, value as Record<string, BasicValue>, isValidNavtitleField);

/**
 * Construct a `navtitle` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `navtitle` node
 */
export function makeNavtitle<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeClass);
}

/**
 * Create a `navtitle` node
 *
 * @decorator `@makeComponent`
 * @param makeNavtitle - The `Navtitle` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidNavtitleField - A boolean value, if the field is valid or not
 * @param fields - A List of valid fields
 * @param childNodes - An Array of allowed child node `text*` or `%ph*`
 */
@makeComponent(makeNavtitle, 'navtitle', isValidNavtitleField, NavtitleFields, [['text*', '%ph*']])
export class NavtitleNode extends AbstractBaseNode implements NavtitleNodeAttributes {

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA
}