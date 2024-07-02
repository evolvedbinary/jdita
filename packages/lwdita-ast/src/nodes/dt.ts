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
import { ReuseFields, ReuseNodeAttributes, isValidReuseField, makeReuse } from "./reuse";
import { BasicValue } from "../classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `dt` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const DtFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface DtNodeAttributes defines the attribute types for `dt`
 */
export interface DtNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `dt` node are valid and match this list:
 * @See {@link DtFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidDtField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `dt` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `dt` node to test
 * @returns Boolean
 */
export const isDtNode = (value?: unknown): value is DtNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(DtFields, value as Record<string, BasicValue>, isValidDtField);

/**
 * Construct a `dt` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `dt` node
 */
export function makeDt<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `dt` (Description term) node
 *
 * @decorator `@makeComponent`
 * @param makeDt - The `dt` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDtField - A boolean value, if the attribute is valid or not
 * @param DtFields - An array containing all valid attribute names @See {@link DtFields}
 * @param childNodes - An array containing all valid child node names: `%inline*` (`text`, `b`, `em`, `i`, `ph`, `strong`, `sub`, `sup`, `tt`, `u`, `image`, `xref`)
 * @returns A `dt` node
 */
@makeComponent(makeDt, 'dt', isValidDtField, DtFields, ['%inline*'])
export class DtNode extends AbstractBaseNode implements DtNodeAttributes {
  static domNodeName = 'dt';

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // ReuseNodeAttributes
  'id'?: NMTOKEN
  'conref'?: CDATA

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA
}