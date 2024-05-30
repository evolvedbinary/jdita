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
import { ReuseNodeAttributes, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "../utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `simpletable` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`
 */
export const SimpleTableFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface SimpleTableNodeAttributes defines the attribute types for `simpletable`:
 * `CDATA`, `NMTOKEN`
 */
export interface SimpleTableNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `simpletable` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidSimpleTableField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `simpletable` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `simpletable` node to test
 * @returns Boolean
 */
export const isSimpleTableNode = (value?: unknown): value is SimpleTableNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(SimpleTableFields, value as Record<string, BasicValue>, isValidSimpleTableField);

/**
 * Construct a `simpletable` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `simpletable` node
 */
export function makeSimpleTable<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `simpletable` node (table) and map the `simpletable` node with the LwDita tag name `table`
 *
 * @decorator `@makeComponent`
 * @param makeSimpleTable - The `simpletable` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidSimpleTableField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link SimpleTableFields}
 * @param childNodes - An Array of allowed child nodes `sthead?`, `strow+`
 */
@makeComponent(makeSimpleTable, 'simpletable', isValidSimpleTableField, SimpleTableFields, ['sthead?', 'strow+'])
export class SimpleTableNode extends AbstractBaseNode implements SimpleTableNodeAttributes {
  static domNodeName = 'table'

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