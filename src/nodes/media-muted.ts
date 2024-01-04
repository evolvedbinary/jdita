import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";
import { BasicValue } from "../classes";

/**
 * Define all allowed `media-muted` fields:
 * `dir`, `xml:lang`, `translate`, `name`, `value`, `class`, `outputclass`
 */
export const MediaMutedFields = [...LocalizationFields, ...FieldFields, ...ClassFields];

/**
 * Interface MediaMutedNode defines the attribute types for `media-muted`:
 * `CDATA`, `T`
 */
export interface MediaMutedNode extends LocalizationNode, FieldNode<boolean>, ClassNode { }

/**
 * Check if the given fields of the `media-muted` node are valid
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidMediaMutedField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `media-muted` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `media-muted` node to test
 * @returns Boolean
 */
export const isMediaMutedNode = (value?: {}): value is MediaMutedNode =>
  typeof value === 'object' && areFieldsValid(MediaMutedFields, value, isValidMediaMutedField);

/**
 * Construct a `media-muted` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `media-muted` node
 */
export function makeMediaMuted<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

/**
 * Create a `media-muted` node
 *
 * @remarks
 * Muted indicates if the audio of a media object will be silenced or not.
 *
 * @decorator `@makeComponent`
 * @param makeMediaMuted - The `media-muted` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidMediaMutedField - A boolean value, if the field is valid or not
 * @param fields - A List of valid fields
 */
@makeComponent(makeMediaMuted, 'media-muted', isValidMediaMutedField, MediaMutedFields)
export class MediaMutedNode extends BaseNode { }
