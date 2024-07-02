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
 * Define all allowed `body` attributes:
 * `dir`, `xml:lang`, `translate`, `outputclass`, `class`
 */
export const BodyFields = [...LocalizationFields, ...ClassFields];

/**
 * Interface BodyNode defines the attribute types for `body`:
 */
export interface BodyNodeAttributes extends LocalizationNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `body` node are valid and match this list:
 * `dir`, `xml:lang`, `translate`, `outputclass`, `class`
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidBodyField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `body` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `body` node to test
 * @returns Boolean
 */
export const isBodyNode = (value?: unknown): value is BodyNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(BodyFields, value as Record<string, BasicValue>, isValidBodyField);

/**
 * Construct a `body` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `body` node
 * */
export function makeBody<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeClass);
}

/**
 * Create a `body` node (link) and map the `body` node with the LwDita tag name `div`
 *
 * @decorator `@makeComponent`
 * @param makeBody - The `Body` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidBodyField - A boolean value, if the attribute is valid or not
 * @param BodyFields - An array containing all valid attribute names
 * @param childNodes - An array containing all valid child node names: `%list-blocks*`, `section*`, `div?` (`p`,`ul`, `ol`, `dl`, `pre`, `audio`, `video`, `example`, `simpletable`, `fig`, `note`)
 */
@makeComponent(makeBody, 'body', isValidBodyField, BodyFields, ['%list-blocks*', 'section*', 'div?'])
export class BodyNode extends AbstractBaseNode implements BodyNodeAttributes {
  static domNodeName = 'div';

    // ClassNodeAttributes
    'outputclass'?: CDATA
    'class'?: CDATA

    // LocalizationNodeAttributes
    'dir'?: CDATA
    'xml:lang'?: CDATA
    'translate'?: CDATA
}