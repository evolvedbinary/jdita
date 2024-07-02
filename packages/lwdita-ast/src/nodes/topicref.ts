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
import { CDATA, isCDATA, NMTOKEN, ReferenceContentScope } from "../ast-classes";
import { isValidReferenceContentField, ReferenceContentFields, ReferenceContentNodeAttributes } from "./reference-content";
import { FiltersFields, FiltersNodeAttributes, isValidFiltersField, makeFilters } from "./filters";
import { isValidReuseField, makeReuse, ReuseFields, ReuseNodeAttributes } from "./reuse";
import { isValidVariableContentField, makeVariableContent, VariableContentFields, VariableContentNodeAttributes } from "./variable-content";

/**
 * Define all allowed `topicref` attributes:
 * `dir`, `xml:lang`, `translate`, `props`, `class`, `outputclass`, `id`, `conref`, `href`, `format`, `scope`, `keyref`, `keys`
 */
export const TopicrefFields = [
  ...LocalizationFields,
  ...FiltersFields,
  ...ClassFields,
  ...ReferenceContentFields,
  ...ReuseFields,
  ...VariableContentFields,
  'keys'
];

/**
 * Interface TopicrefNode defines the attribute types for `topicref`
 */
export interface TopicrefNodeAttributes extends
  LocalizationNodeAttributes,
  FiltersNodeAttributes,
  ClassNodeAttributes,
  ReferenceContentNodeAttributes,
  ReuseNodeAttributes,
  VariableContentNodeAttributes,
  BaseNode {
  'keys': CDATA
}

/**
 * Check if the given attributes of the `topicref` node are valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export function isValidTopicrefField(field: string, value: BasicValue): boolean {
  if ( isValidLocalizationField(field, value)
    || isValidFiltersField(field, value)
    || isValidClassField(field, value)
    || isValidReferenceContentField(field, value)
    || isValidVariableContentField(field, value)
    || isValidReuseField(field, value)
  ) {
    return true;
  }
  switch(field) {
    case 'keys': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `topicref` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `topicref` node to test
 * @returns Boolean
 */
export const isTopicrefNode = (value?: unknown): value is TopicrefNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(TopicrefFields, value as Record<string, BasicValue>, isValidTopicrefField);

/**
 * Construct a `topicref` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `topicref` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeTopicref<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T  {
  return makeAll(class extends constructor {
    get 'keys'(): CDATA {
      return this.readProp<CDATA>('keys'); }
    set 'keys'(value: CDATA) {
        this.writeProp<CDATA>('keys', value); }
  },
    makeLocalization,
    makeClass,
    makeReuse,
    makeFilters,
    makeVariableContent
  );
}

/**
 * Create a `topicref` node (Topic or Map Reference)
 *
 * @decorator `@makeComponent`
 * @param makeTopicref - The `topicref` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidTopicrefField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes, @see {@link TopicrefFields}
 * @param childNodes - An Array of allowed child nodes: `topicmeta?`
 */
@makeComponent(makeTopicref, 'topicref', isValidTopicrefField, TopicrefFields, ['topicmeta?', 'topicref?'])
export class TopicrefNode extends AbstractBaseNode implements TopicrefNodeAttributes {

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

  // ReuseNodeAttributes
  'id'?: NMTOKEN;
  'conref'?: CDATA;

  // TopicrefNodeAttributes
  'keys': CDATA

  // VariableContentNodeAttributes
  'keyref'?: CDATA;

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA
}