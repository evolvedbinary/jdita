import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "@jdita/lwdita-xml/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";
import { BasicValue } from "@jdita/lwdita-xml/classes";

/**
 * Define all allowed `media-autoplay` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`
 * Custom attributes are `name`, `value`
 */
export const MediaAutoplayFields = [...LocalizationFields, ...FieldFields, ...ClassFields];

/**
 * Interface MediaAutoplayNode defines the attribute types for `media-autoplay`:
 * `CDATA`, `T`
 */
export interface MediaAutoplayNode extends LocalizationNode, FieldNode<boolean>, ClassNode { }

/**
 * Check if the given attributes of the `media-autoplay` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidMediaAutoplayField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `media-autoplay` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `media-autoplay` node to test
 * @returns Boolean
 */
export const isMediaAutoplayNode = (value?: {}): value is MediaAutoplayNode =>
  typeof value === 'object' && areFieldsValid(MediaAutoplayFields, value, isValidMediaAutoplayField);

/**
 * Construct a `media-autoplay` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `media-autoplay` node
 */
export function makeMediaAutoplay<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

/**
 * Create a `media-autoplay` node
 *
 * @remarks
 * Autoplay determines if audio or video content should automatically begin to play.
 *
 * @decorator `@makeComponent`
 * @param makeMediaAutoplay - The `media-autoplay` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidMediaAutoplayField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link MediaAutoplayFields}
 */
@makeComponent(makeMediaAutoplay, 'media-autoplay', isValidMediaAutoplayField, MediaAutoplayFields)
export class MediaAutoplayNode extends BaseNode { }