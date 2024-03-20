import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "@jdita/lwdita-xml/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";
import { BasicValue } from "@jdita/lwdita-xml/classes";

/**
 * Define all allowed `video-poster` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`
 * Custom attributes are `name`, `value`
 */
export const VideoPosterFields = [...LocalizationFields, ...FieldFields, ...ClassFields];

/**
 * The interface `VideoPosterNode` defines all attribute types for `video-poster`:
 * `CDATA`, `T`
 */
export interface VideoPosterNode extends LocalizationNode, FieldNode<boolean>, ClassNode { }

/**
 * Check if the given attributes of the `video-poster` node are valid
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidVideoPosterField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `video-poster` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `video-poster` node to test
 * @returns Boolean
 */
export const isVideoPosterNode = (value?: {}): value is VideoPosterNode =>
  typeof value === 'object' && areFieldsValid(VideoPosterFields, value, isValidVideoPosterField);

/**
 * Construct a `video-poster` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `video-poster` node
 */
export function makeVideoPoster<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

/**
 * Create a video-poster node
 *
 * @decorator `@makeComponent`
 * @param makeVideoPoster - The `video-poster` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidVideoPosterField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @See {@link VideoPosterFields}
 */
@makeComponent(makeVideoPoster, 'video-poster', isValidVideoPosterField, VideoPosterFields)
export class VideoPosterNode extends BaseNode { }