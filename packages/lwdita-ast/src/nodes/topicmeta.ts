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
import { areFieldsValid } from "../utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `topicmeta` (Metadata) attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`
 */
export const TopicmetaFields = [...LocalizationFields, ...ClassFields];

/**
 * Interface TopicmetaNode defines the attribute types for `topicmeta`:
 */
export interface TopicmetaNodeAttributes extends LocalizationNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `topicmeta` node are valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export const isValidTopicmetaField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `topicmeta` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `topicmeta` node to test
 * @returns Boolean
 */
export const isTopicmetaNode = (value?: unknown): value is TopicmetaNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(TopicmetaFields, value as Record<string, BasicValue>, isValidTopicmetaField);

/**
 * Construct a `topicmeta` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `topicmeta` node
 */
export function makeTopicmeta<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeClass);
}

/**
 * Create a `topicmeta` node (Metadata)
 *
 * @decorator `@makeComponent`
 * @param makeTopicmeta - The `topicmeta` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidTopicmetaField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes, @see {@link TopicmetaFields}
 * @param childNodes - An Array of allowed child nodes: `navtitle?`, `keytext?`, `othermeta*`
 */
@makeComponent(makeTopicmeta, 'topicmeta', isValidTopicmetaField, TopicmetaFields, ['navtitle?', 'keytext?', 'othermeta*'])
export class TopicmetaNode extends AbstractBaseNode implements TopicmetaNodeAttributes {

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA
}