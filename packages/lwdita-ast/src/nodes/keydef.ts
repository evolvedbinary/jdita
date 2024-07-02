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
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid, isOrUndefined } from "../utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll } from "./base";
import { BasicValue } from "../classes";
import { CDATA, isCDATA, isProcessingRole, ProcessingRole, ReferenceContentScope } from "../ast-classes";
import { isValidReferenceContentField, makeReferenceContent, ReferenceContentFields, ReferenceContentNodeAttributes } from "./reference-content";
import { FiltersFields, FiltersNodeAttributes, isValidFiltersField, makeFilters } from "./filters";

/**
 * Define all allowed `keydef` attributes:
 * `dir`, `xml:lang`, `translate`, `props`, `class`, `outputclass`, `href`, `format`, `scope`, `keys`, `processing-role`
 */
export const KeydefFields = [
  ...LocalizationFields,
  ...FiltersFields,
  ...ClassFields,
  ...ReferenceContentFields,
  'keys',
  'processing-role'
];

/**
 * Interface KeydefNode defines the attribute types for `keydef`
 */
export interface KeydefNodeAttributes extends
  LocalizationNodeAttributes,
  FiltersNodeAttributes,
  ClassNodeAttributes,
  ReferenceContentNodeAttributes,
  BaseNode {
  'keys': CDATA
  'processing-role': ProcessingRole
}

/**
 * Check if the given attributes of the `keydef` node are valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export function isValidKeydefField(field: string, value: BasicValue): boolean {
  if ( isValidLocalizationField(field, value)
    || isValidFiltersField(field, value)
    || isValidClassField(field, value)
    || isValidReferenceContentField(field, value)
  ) {
    return true;
  }
  switch(field) {
    case 'keys': return isOrUndefined(isCDATA, value);
    case 'processing-role': return isOrUndefined(isProcessingRole, value);
    default: return false;
  }
}

/**
 * Check if the `keydef` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `keydef` node to test
 * @returns Boolean
 */
export const isKeydefNode = (value?: unknown): value is KeydefNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(KeydefFields, value as Record<string, BasicValue>, isValidKeydefField);

/**
 * Construct a `keydef` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `keydef` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeKeydef<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T  {
  return makeAll(class extends constructor {
    get 'keys'(): CDATA {
      return this.readProp<CDATA>('keys'); }
    set 'keys'(value: CDATA) {
        this.writeProp<CDATA>('keys', value); }
  },
    makeLocalization,
    makeClass,
    makeReferenceContent,
    makeFilters
  );
}

/**
 * Create a `keydef` node (Key Definition)
 *
 * @decorator `@makeComponent`
 * @param makeKeydef - The `keydef` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidKeydefField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes, @see {@link KeydefFields}
 * @param childNodes - An Array of allowed child nodes: `topicmeta?`
 */
@makeComponent(makeKeydef, 'keydef', isValidKeydefField, KeydefFields, ['topicmeta?'])
export class KeydefNode extends AbstractBaseNode implements KeydefNodeAttributes {

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props': CDATA

  // ReferenceContentNodeAttributes
  'href'?: CDATA;
  'format'?: CDATA;
  'scope'?: ReferenceContentScope;

  // KeydefNodeAttributes
  'keys': CDATA
  'processing-role': ProcessingRole

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA
}