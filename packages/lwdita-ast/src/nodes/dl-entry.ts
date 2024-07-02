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
import { ReuseNodeAttributes, isValidReuseField, ReuseFields, makeReuse } from "./reuse";
import { BasicValue } from "../classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `dlentry` fields:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const DlEntryFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface DlEntryNodeAttributes defines the attribute types for `dlentry`
 */
export interface DlEntryNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `dlentry` node are valid and match this list:
 * @See {@link DlEntryFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidDlEntryField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `display` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `display` node to test
 * @returns Boolean
 */
export const isDlEntryNode = (value?: unknown): value is DlEntryNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(DlEntryFields, value as Record<string, BasicValue>, isValidDlEntryField);

/**
 * Construct a `dlentry` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `dlentry` node
 */
export function makeDlEntry<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `dlentry` (Description entry) node
 *
 * @decorator `@makeComponent`
 * @param makeDlEntry - The `dlEntry` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDlEntryField - A boolean value, if the attribute is valid or not
 * @param DlEntryFields - An array containing all valid attribute names @see {@link DlEntryFields}
 * @param childNodes - An array containing all valid child node names: `dt`, `dd`
 * @returns A `dlentry` node
 */
@makeComponent(makeDlEntry, 'dlentry', isValidDlEntryField, DlEntryFields, ['dt', 'dd'])
export class DlEntryNode extends AbstractBaseNode implements DlEntryNodeAttributes {
  static domNodeName = '';

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