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
import { VariableContentNodeAttributes, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "../utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `ph` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `keyref`, `class`, `outputclass`
 */
export const PhFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface PhNodeAttributes defines the attribute type for `ph`: `CDATA`
 */
export interface PhNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, VariableContentNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `ph` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidPhField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `ph` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `ph` node to test
 * @returns Boolean
 */
export const isPhNode = (value?: unknown): value is PhNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(PhFields, value as Record<string, BasicValue>, isValidPhField);

/**
 * Construct a `ph` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `ph` node
 */
export function makePh<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeVariableContent, makeClass);
}

/**
 * Create a `ph` node (Phrase Content) and map the `ph` node with the LwDita tag name `span`
 *
 * @decorator `@makeComponent`
 * @param makePh - The `ph` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidPhField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link PhFields}
 * @param childNodes - An Array of allowed child node `%inline*` (`text`, `b`, `em`, `i`, `ph`, `strong`, `sub`, `sup`, `tt`, `u`, `image`, `xref`)
 */
@makeComponent(makePh, 'ph', isValidPhField, PhFields, ['%inline*'])
export class PhNode extends AbstractBaseNode implements PhNodeAttributes {
  static domNodeName = 'span';

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // VariableContentNodeAttributes
  'keyref'?: CDATA

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA
}