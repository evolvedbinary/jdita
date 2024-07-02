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
import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "../utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `desc` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `outputclass`, `class`,
 */
export const DescFields = [...FiltersFields, ...LocalizationFields, ...ClassFields];

/**
 * Interface DescNode defines the attribute types for `desc`
 */
export interface DescNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `desc` node are valid and match this list:
 * See {@link DescFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidDescField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `desc` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `desc` node to test
 * @returns Boolean
 */
export const isDescNode = (value?: unknown): value is DescNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(DescFields, value as Record<string, BasicValue>, isValidDescField);

/**
 * Construct a `desc` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `desc` node
 */
export function makeDesc<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeClass);
}
/**
 * Create a `desc` (Description) node
 *
 * @privateRemarks
 * TODO: Implement caption/figcaption
 *
 * @decorator `@makeComponent`
 * @param makeDesc - The `Desc` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDescField - A boolean value, if the attribute is valid or not
 * @param DescFields - An array containing all valid attribute names @See {@link DescFields}
 * @param childNodes - An array containing all valid child node names: `%inline.noxref*` (`text`, `ph`, `image`)
 * @returns A `desc` node
 */
@makeComponent(makeDesc, 'desc', isValidDescField, DescFields, ['%inline.noxref*'])
export class DescNode extends AbstractBaseNode implements DescNodeAttributes {
  static domNodeName = 'caption';

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA
}