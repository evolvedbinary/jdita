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

import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "../utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { ReuseFields, ReuseNodeAttributes, isValidReuseField, makeReuse } from "./reuse";
import { BasicValue } from "../classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `dd` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const DdFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface DdNodeAttributes defines the attribute types for `dd`
 */
export interface DdNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `dd` node are valid and match this list:
 * @See {@link DdFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidDdField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `dd` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `dd` node to test
 * @returns Boolean
 */
export const isDdNode = (value?: unknown): value is DdNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(DdFields, value as Record<string, BasicValue>, isValidDdField);

/**
 * Construct a `dd` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `dd` node
 */
export function makeDd<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `dd` (Description) node
 *
 * @decorator `@makeComponent`
 * @param makeDd - The `dd` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDdField - A boolean value, if the attribute is valid or not
 * @param DdFields - An array containing all valid attribute names, @see {@link DdFields}
 * @param childNodes - An array containing all valid child node names: `%list-blocks*` (`p`,`ul`, `ol`, `dl`, `pre`, `audio`, `video`, `example`, `simpletable`, `fig`, `note`)
 * @returns A `dd` node
 */
@makeComponent(makeDd, 'dd', isValidDdField, DdFields, ['%list-blocks*'])
export class DdNode extends AbstractBaseNode implements DdNodeAttributes {
  static domNodeName = 'dd';

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