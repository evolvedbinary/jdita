import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";
import { BasicValue } from "../classes";

/**
 * Define all allowed `media-loop` fields:
 * `dir`, `xml:lang`, `translate`, `name`, `value`, `class`, `outputclass`
 */
export const MediaLoopFields = [...LocalizationFields, ...FieldFields, ...ClassFields];

/**
 * Interface MediaLoopNode defines the attribute types for `media-loop`:
 * `CDATA`, `T`
 */
export interface MediaLoopNode extends LocalizationNode, FieldNode<boolean>, ClassNode { }

/**
 * Check if the given fields of the `media-loop` node are valid
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidMediaLoopField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `media-loop` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `media-loop` node to test
 * @returns Boolean
 */
export const isMediaLoopNode = (value?: {}): value is MediaLoopNode =>
  typeof value === 'object' && areFieldsValid(MediaLoopFields, value, isValidMediaLoopField);

/**
 * Construct a `media-loop` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `media-loop` node
 */
export function makeMediaLoop<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

/**
 * Create a `media-loop` node
 *
 * @decorator `@makeComponent`
 * @param makeMediaLoop - The `media-loop` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidMediaLoopField - A boolean value, if the field is valid or not
 * @param fields - A List of valid fields
 */
@makeComponent(makeMediaLoop, 'media-loop', isValidMediaLoopField, MediaLoopFields)
export class MediaLoopNode extends BaseNode { }
