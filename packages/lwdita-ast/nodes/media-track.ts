import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid, isOrUndefined } from "@jdita/lwdita-xml/utils";
import { makeComponent, BaseNode, makeAll } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";
import { BasicValue } from "@jdita/lwdita-xml/classes";
import { CDATA, isCDATA } from "../ast-classes";

/**
 * Define all allowed `media-track` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`, `type`
 * Custom attributes are `name`, `value`
 */
export const MediaTrackFields = [...LocalizationFields, ...FieldFields, ...ClassFields, 'type'];

/**
 * Interface MediaTrackNode defines the attribute types for `media-track`:
 * `CDATA`, `T`
 */
export interface MediaTrackNode extends LocalizationNode, FieldNode<boolean>, ClassNode { }

/**
 * Check if the given fields of the `media-track` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidMediaTrackField = (field: string, value: BasicValue): boolean => {
  if (isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value)) {
    return true;
  }
  switch (field) {
    case 'type': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `media-track` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `media-track` node to test
 * @returns Boolean
 */
export const isMediaTrackNode = (value?: {}): value is MediaTrackNode =>
  typeof value === 'object' && areFieldsValid(MediaTrackFields, value, isValidMediaTrackField);


/**
 * Construct a `media-track` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `media-track` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeMediaTrack<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return makeAll(class extends constructor {
    get 'type'(): CDATA {
      return this.readProp<CDATA>('type'); }
    set 'type'(value: CDATA) {
        this.writeProp<CDATA>('type', value); }
  }, makeLocalization, makeBooleanField, makeClass);
}

/**
 * Create a `media-track` node
 *
 * @remarks
 * Track is a link to time-based text data relevant to audio or video content.
 *
 * @decorator `@makeComponent`
 * @param makeMediaTrack - The `media-track` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidMediaTrackField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link MediaTrackFields}
 */
@makeComponent(makeMediaTrack, 'media-track', isValidMediaTrackField, MediaTrackFields)
export class MediaTrackNode extends BaseNode { }