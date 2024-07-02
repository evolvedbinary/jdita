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
 * Define all allowed `p` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`
 */
export const PFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface PNodeAttributes defines the attribute types for `p`:
 * `CDATA`, `NMTOKEN`
 */
export interface PNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `p` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidPField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `p` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `p` node to test
 * @returns Boolean
 */
export const isPNode = (value?: unknown): value is PNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(PFields, value as Record<string, BasicValue>, isValidPField);

/**
 * Construct a `p` node with all available attributes
 *
 * @remarks
 * eslint-disable-next-line `@typescript-eslint/no-explicit-any`
 *
 * @param constructor - The constructor
 * @returns An `p` node
 */
export function makeP<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `p` node (paragraph) and map the `p` node with the LwDita tag name `p`
 *
 * @decorator `@makeComponent`
 * @param makeP - The `p` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidPField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @See {@link PFields}
 * @param childNodes - An Array of allowed child nodes `%all-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `xref`, `data`)
 */
@makeComponent(makeP, 'p', isValidPField, PFields, ['%all-inline*'])
export class PNode extends AbstractBaseNode implements PNodeAttributes {
  static domNodeName = 'p';

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