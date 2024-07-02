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
import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "../utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `div` (Division) fields:
 * `dir`, `xml:lang`, `translate`, `props`, `outputclass`, `class`
 */
export const DivFields = [...LocalizationFields, ...FiltersFields, ...ClassFields];

/**
 * Interface `DivNodeAttributes` defines the attribute types for `div`:
 */
export interface DivNodeAttributes extends LocalizationNodeAttributes, FiltersNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given fields of the `div` node are valid and matches this list:
 * `dir`, `xml:lang`, `translate`, `props`, `outputclass`, `class`
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidDivField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidFiltersField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `div` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `div` node to test
 * @returns Boolean
 */
export const isDivNode = (value?: unknown): value is DivNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(DivFields, value as Record<string, BasicValue>, isValidDivField);

/**
 * Construct a `div` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `div` node
 */
export function makeDiv<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeClass);
}

/**
 * Create a `div` node
 *
 * @decorator `@makeComponent`
 * @param makeDiv - The `div` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDivField - A boolean value, if the field is valid or not
 * @param fields - A List of valid fields
 * @param childNodes - An Array of allowed child node `fn+`
 */
@makeComponent(makeDiv, 'div', isValidDivField, DivFields, ['fn+'])
export class DivNode extends AbstractBaseNode implements DivNodeAttributes {

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA
}