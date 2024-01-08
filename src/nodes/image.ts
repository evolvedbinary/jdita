import { FiltersNode, isFiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { LocalizationNode, isLocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { VariableContentNode, isVariableContentNode, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { ReferenceContentNode, isReferenceContentNode, ReferenceContentFields, makeReferenceContent, isValidReferenceContentField } from "./reference-content";
import { areFieldsValid } from "../utils";
import { ClassNode, isClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { SizeFields, SizeNode, isSizeNode, isValidSizeField, makeSize } from "./size";
import { BasicValue } from "../classes";

/**
 * Define all allowed `image` fields:
 * `props`, `dir`, `xml:lang`, `translate`, `keyref`, `outputclass`, `class`, `scale`, `href`, `format`, `scope`, `width`, `height`
 */
export const ImageFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ReferenceContentFields, ...ClassFields, ...SizeFields];

/**
 * Interface ImageNode defines the attribute types for `image`
 */
export interface ImageNode extends FiltersNode, LocalizationNode, VariableContentNode, ReferenceContentNode, ClassNode, SizeNode { }

/**
/**
 * Check if the `image` node is valid
 * 
 * @remarks
 * Assert that the node is an object and has valid attributes
 * 
 * @param value - The `image` node to test
 * @returns Boolean
 */
export const isImageNodes = (value?: {}): value is ImageNode =>
  typeof value === 'object' &&
  isClassNode(value) &&
  isFiltersNode(value) &&
  isLocalizationNode(value) &&
  isReferenceContentNode(value) &&
  isVariableContentNode(value) &&
  isSizeNode(value);


/**
 * Check if the given fields of the `image` node are valid and matches this list:
 * @See {@link ImageFields}
 * 
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidImageField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value)
  || isValidReferenceContentField(field, value)
  || isValidFiltersField(field, value)
  || isValidVariableContentField(field, value)
  || isValidSizeField(field, value);

//TODO is this needed?
export const isImageNode = (value?: {}): value is ImageNode =>
  typeof value === 'object' && areFieldsValid(ImageFields, value, isValidImageField);

/**
 * Construct an `image` node with all available attributes
 * 
 * @param constructor - The constructor
 * @returns An `image` node
 */
export function makeImage<T extends Constructor>(constructor: T): T {
  // TODO: add properties
  return makeAll(constructor, makeLocalization, makeFilters, makeVariableContent, makeClass, makeReferenceContent, makeSize);
}


/**
 * Create an image node
 * 
 * @decorator `@makeComponent`
 * @param makeImage - The `image` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidImageField - A boolean value, if the field is valid or not
 * @param ImageFields - An array containing all valid field names See {@link ImageFields}
 * @param childNodes - An array containing all valid child node names: `alt?`
 * @returns An `image` node
 */
@makeComponent(makeImage, 'image', isValidImageField, ImageFields, ['alt?'])
export class ImageNode extends BaseNode {}
