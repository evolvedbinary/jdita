import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";
import { BasicValue } from "@jdita/lwdita-xdita/classes";

/**
 * Define all allowed `media-source` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`
 * Custom attributes are `name`, `value`
 */
export const MediaSourceFields = [...LocalizationFields, ...FieldFields, ...ClassFields];

/**
 * Interface MediaSourceNode defines the attribute types for `media-source`:
 * `CDATA`, `T`
 */
export interface MediaSourceNode extends LocalizationNode, FieldNode<boolean>, ClassNode { }

/**
 * Check if the given attributes of the `media-source` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidMediaSourceField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `media-source` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `media-source` node to test
 * @returns Boolean
 */
export const isMediaSourceNode = (value?: {}): value is MediaSourceNode =>
  typeof value === 'object' && areFieldsValid(MediaSourceFields, value, isValidMediaSourceField);

/**
 * Construct a `media-source` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `media-source` node
 */
export function makeMediaSource<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

/**
 * Create a `media-source` node and map the `media-source` node with the LwDita tag name `source`
 *
 * @decorator `@makeComponent`
 * @param makeMediaSource - The `media-source` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidMediaSourceField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link MediaSourceFields}
 */
@makeComponent(makeMediaSource, 'media-source', isValidMediaSourceField, MediaSourceFields)
export class MediaSourceNode extends BaseNode {
  static domNodeName = 'source';
}