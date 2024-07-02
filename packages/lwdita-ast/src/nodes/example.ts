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

import { LocalizationNodeAttributes, isLocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "../utils";
import { ClassNodeAttributes, isClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";
import { CDATA, NMTOKEN, DisplayExpanse, DisplayFrame, DisplayScale, } from "../ast-classes";
import { DisplayNodeAttributes, DisplayFields, isValidDisplayField, makeDisplay, isDisplayNode } from "./display";
import { ReuseFields, ReuseNodeAttributes, isReuseNode, isValidReuseField, makeReuse } from "./reuse";
import { FiltersFields, isFiltersNode, isValidFiltersField, FiltersNodeAttributes } from "./filters";

/**
 * Define all allowed `example` attributes:
 * `scale`, `frame`, `expanse`, `dir`, `xml:lang`, `translate`,  `props`, `id`, `conref`, `outputclass`, `class`
 */
export const ExampleFields = [...DisplayFields, ...LocalizationFields, ...FiltersFields, ...ReuseFields, ...ClassFields];

/**
 * Interface ExampleNodeAttributes defines the attribute types for `example`
 */
export interface ExampleNodeAttributes extends DisplayNodeAttributes, LocalizationNodeAttributes, FiltersNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the `example` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `example` node to test
 * @returns Boolean
 */
export const isExampleNodes = (value?: unknown): value is ExampleNodeAttributes =>
  typeof value === 'object' &&
  !!value &&
  isDisplayNode(value) &&
  isLocalizationNode(value) &&
  isFiltersNode(value) &&
  isReuseNode(value) &&
  isClassNode(value)

/**
 * Check if the given attributes of the `example` node are valid and match this list:
 * @See {@link ExampleFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the field attribute
 * @returns Boolean
 */
export const isValidExampleField = (field: string, value: BasicValue): boolean => isValidDisplayField(field, value)
  || isValidLocalizationField(field, value)
  || isValidFiltersField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `example` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `example` node to test
 * @returns Boolean
 */
export const isExampleNode = (value?: unknown): value is ExampleNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(ExampleFields, value as Record<string, BasicValue>, isValidExampleField);

/**
 * Construct an `example` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `example` node
 */
export function makeExample<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeDisplay, makeLocalization, makeClass, makeReuse);
}

/**
 * Create an `example` node
 *
 * @decorator `@makeComponent`
 * @param makeExample - The `example` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidExampleField - A boolean value, if the attribute is valid or not
 * @param ExampleFields - An array containing all valid attribute names, @see {@link ExampleFields}
 * @param childNodes - An array containing all valid child node names: 'title?, 'p','ul','ol','dl','pre','audio','video','simpletable','fig','note'
 * @returns An `example` node
 */
@makeComponent(makeExample, 'example', isValidExampleField, ExampleFields, ['title?', '%example-blocks'])
export class ExampleNode extends AbstractBaseNode implements ExampleNodeAttributes {

  // DisplayNodeAttributes
  'scale'?: DisplayScale;
  'frame'?: DisplayFrame;
  'expanse'?: DisplayExpanse;

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
  'outputclass'?: CDATA
  'class'?: CDATA
}