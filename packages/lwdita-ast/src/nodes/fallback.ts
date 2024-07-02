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
import { ClassFields, ClassNodeAttributes, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "../utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";
import { CDATA } from "../ast-classes";
import { FiltersFields, FiltersNodeAttributes, isValidFiltersField, makeFilters } from "./filters";

/**
 * Define all allowed `fallback` attributes:
 * `dir`, `xml:lang`, `translate`, `props`, `class`, `outputclass`
 */
export const FallbackFields = [...LocalizationFields, ...FiltersFields, ...ClassFields];

/**
 * Interface FallbackNode defines the attribute types for `fallback`:
 */
export interface FallbackNodeAttributes extends
  LocalizationNodeAttributes,
  FiltersNodeAttributes,
  ClassNodeAttributes,
  BaseNode {
}

/**
 * Check if the given attributes of the `fallback` node are valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export const isValidFallbackField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidFiltersField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `fallback` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `fallback` node to test
 * @returns Boolean
 */
export const isFallbackNode = (value?: unknown): value is FallbackNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(FallbackFields, value as Record<string, BasicValue>, isValidFallbackField);

/**
 * Construct a `fallback` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `fallback` node
 */
export function makeFallback<T extends Constructor>(constructor: T): T {
  return makeAll(
    constructor,
    makeLocalization,
    makeFilters,
    makeClass
  );
}

/**
 * Create a `fallback` node (Fallback)
 *
 * @decorator `@makeComponent`
 * @param makeFallback - The `fallback` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidFallbackField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes, @see {@link FallbackFields}
 * @param childNodes - An Array of allowed child nodes `image`,`alt`,`p`,`ul`,`ol`,`dl`,`pre`,`note`
 */
@makeComponent(makeFallback, 'fallback', isValidFallbackField, FallbackFields, ['%fallback-blocks*'])
export class FallbackNode extends AbstractBaseNode implements FallbackNodeAttributes {

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA;

  // ClassNodeAttributes
  'outputclass'?: CDATA;
  'class'?: CDATA;
}