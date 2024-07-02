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
import { CDATA, ID, INCLUDED_DOMAINS, isCDATA } from "../ast-classes";
import { isValidSpecializationsField, makeSpecializations, SpecializationsFields, SpecializationsNodeAttributes } from "./specializations-type";

/**
 * Define all allowed `map` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`, `specializations`, `id`, `xmlns:ditaarch`, `ditaarch:DITAArchVersion`
 */
export const MapFields = [
  ...LocalizationFields,
  ...ClassFields,
  ...SpecializationsFields,
  'id',
  'xmlns:ditaarch',
  'ditaarch:DITAArchVersion'
];

/**
 * Interface MapNode defines the attribute types for `map`
 */
export interface MapNodeAttributes extends
  LocalizationNodeAttributes,
  ClassNodeAttributes,
  SpecializationsNodeAttributes,
  BaseNode {
  'id': ID
  'xmlns:ditaarch': CDATA
  'ditaarch:DITAArchVersion'?: CDATA
}

/**
 * Check if the given attributes of the `map` node are valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export function isValidMapField(field: string, value: BasicValue): boolean {
  if ( isValidLocalizationField(field, value)
    || isValidClassField(field, value)
    || isValidSpecializationsField(field, value)
  ) {
    return true;
  }
  switch(field) {
    case 'id': return isOrUndefined(isCDATA, value);
    case 'xmlns:ditaarch': return isOrUndefined(isCDATA, value);
    case 'ditaarch:DITAArchVersion': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `map` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `map` node to test
 * @returns Boolean
 */
export const isMapNode = (value?: unknown): value is MapNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(MapFields, value as Record<string, BasicValue>, isValidMapField);

/**
 * Construct a `map` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `map` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeMap<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T  {
  return makeAll(class extends constructor {
    get 'id'(): ID {
      return this.readProp<ID>('id');
    }
    set 'id'(value: ID) {
      this.writeProp<ID>('id', value);
    }
    get 'xmlns:ditaarch'(): CDATA {
      return this.readProp<CDATA>('xmlns:ditaarch');
    }
    set 'xmlns:ditaarch'(value: CDATA) {
      this.writeProp<CDATA>('xmlns:ditaarch', value);
    }
    get 'ditaarch:DITAArchVersion'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('ditaarch:DITAArchVersion');
    }
    set 'ditaarch:DITAArchVersion'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('ditaarch:DITAArchVersion', value);
    }
  },
    makeLocalization,
    makeClass,
    makeSpecializations
  );
}

/**
 * Create a `map` node (Map)
 *
 * @decorator `@makeComponent`
 * @param makeMap - The `map` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidMapField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes, @see {@link MapFields}
 * @param childNodes - An Array of allowed child nodes: `topicmeta?`and (`topicref` or `keydef`)*
 */
@makeComponent(makeMap, 'map', isValidMapField, MapFields, ['topicmeta?', ['topicref*', 'keydef*']])
export class MapNode extends AbstractBaseNode implements MapNodeAttributes {

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // SpecializationsNodeAttributes
  'specializations': INCLUDED_DOMAINS

  // MapNodeAttributes
  'id': ID
  'xmlns:ditaarch': CDATA
  'ditaarch:DITAArchVersion': CDATA

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA
}