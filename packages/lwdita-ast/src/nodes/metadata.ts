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
import { CDATA, NMTOKEN } from "../ast-classes";
import { FiltersFields, FiltersNodeAttributes, isValidFiltersField, makeFilters } from "./filters";
import { isValidReuseField, makeReuse, ReuseFields, ReuseNodeAttributes } from "./reuse";

/**
 * Define all allowed `metadata` attributes:
 * `dir`, `xml:lang`, `translate`, `props`, `id`, `conref`, `class`, `outputclass`
 */
export const MetadataFields = [...LocalizationFields, ...FiltersFields, ...ReuseFields, ...ClassFields];

/**
 * Interface MetadataNode defines the attribute types for `metadata`:
 */
export interface MetadataNodeAttributes extends
  LocalizationNodeAttributes,
  FiltersNodeAttributes,
  ReuseNodeAttributes,
  ClassNodeAttributes,
  BaseNode {
}

/**
 * Check if the given attributes of the `metadata` node are valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export const isValidMetadataField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidFiltersField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `metadata` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `metadata` node to test
 * @returns Boolean
 */
export const isMetadataNode = (value?: unknown): value is MetadataNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(MetadataFields, value as Record<string, BasicValue>, isValidMetadataField);

/**
 * Construct a `metadata` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `metadata` node
 */
export function makeMetadata<T extends Constructor>(constructor: T): T {
  return makeAll(
    constructor,
    makeLocalization,
    makeReuse,
    makeFilters,
    makeClass
  );
}

/**
 * Create a `metadata` node (Metadata)
 *
 * @decorator `@makeComponent`
 * @param makeMetadata - The `metadata` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidMetadataField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes, @see {@link MetadataFields}
 * @param childNodes - An Array of allowed child nodes `othermeta*`
 */
@makeComponent(makeMetadata, 'metadata', isValidMetadataField, MetadataFields, ['othermeta*'])
export class MetadataNode extends AbstractBaseNode implements MetadataNodeAttributes {

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA;

  // ReuseNodeAttributes
  'id'?: NMTOKEN;
  'conref'?: CDATA;

  // ClassNodeAttributes
  'outputclass'?: CDATA;
  'class'?: CDATA;
}