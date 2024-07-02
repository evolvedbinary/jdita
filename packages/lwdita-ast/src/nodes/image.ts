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
import { VariableContentNodeAttributes, isVariableContentNode, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { ReferenceContentNodeAttributes, isReferenceContentNode, ReferenceContentFields, makeReferenceContent, isValidReferenceContentField } from "./reference-content";
import { areFieldsValid } from "../utils";
import { ClassNodeAttributes, isClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { SizeFields, SizeNodeAttributes, isSizeNode, isValidSizeField, makeSize } from "./size";
import { BasicValue } from "../classes";
import { CDATA, NMTOKEN, ReferenceContentScope } from "../ast-classes";

/**
 * Define all allowed `image` attributes:
 * `dir`, `xml:lang`, `translate`, `href`, `format`, `scope`, `width`, `height`, `keyref`, `outputclass`, `class`
 */
export const ImageFields = [...LocalizationFields, ...ReferenceContentFields, ...SizeFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface ImageNodeAttributes defines the attribute types for `image`
 */
export interface ImageNodeAttributes extends SizeNodeAttributes, LocalizationNodeAttributes, VariableContentNodeAttributes, ReferenceContentNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the `image` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @privateRemarks
 * Where is `isImageNodes` used?
 * And what is the difference to `isImageNode`?
 *
 * @param value - The `image` node to test
 * @returns Boolean
 */
export const isImageNodes = (value?: unknown): value is ImageNodeAttributes =>
  typeof value === 'object' &&
  !!value &&
  isLocalizationNode(value) &&
  isReferenceContentNode(value) &&
  isSizeNode(value) &&
  isVariableContentNode(value) &&
  isClassNode(value);

/**
 * Check if the given attributes of the `image` node are valid and match this list:
 * @See {@link ImageFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the field attribute
 * @returns Boolean
 */
export const isValidImageField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value)
  || isValidReferenceContentField(field, value)
  || isValidVariableContentField(field, value)
  || isValidSizeField(field, value);

/**
 * Check if the `image` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `image` node to test
 * @returns Boolean
 */
export const isImageNode = (value?: unknown): value is ImageNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(ImageFields, value as Record<string, BasicValue>, isValidImageField);

/**
 * Construct an `image` node with all available attributes
 *
 * @privateRemarks
 * TODO: add properties
 *
 * @param constructor - The constructor
 * @returns An `image` node
 */
export function makeImage<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass, makeReferenceContent, makeSize);
}


/**
 * Create an `image` node
 *
 * @decorator `@makeComponent`
 * @param makeImage - The `image` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidImageField - A boolean value, if the attribute is valid or not
 * @param ImageFields - An array containing all valid attribute names, @see {@link ImageFields}
 * @param childNodes - An array containing all valid child node names: `alt?`
 * @returns An `image` node
 */
@makeComponent(makeImage, 'image', isValidImageField, ImageFields, ['alt?'])
export class ImageNode extends AbstractBaseNode implements ImageNodeAttributes {

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // ReferenceContentNodeAttributes
  'href'?: CDATA
  'format'?: CDATA
  'scope'?: ReferenceContentScope

  // SizeNodeAttributes
  'height'?: NMTOKEN
  'width'?: NMTOKEN

  // VariableContentNodeAttributes
  'keyref'?: CDATA

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA
}