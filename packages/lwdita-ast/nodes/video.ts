import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "@jdita/lwdita-xml/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { SizeNode, SizeFields, isValidSizeField, makeSize } from "./size";
import { BasicValue } from "@jdita/lwdita-xml/classes";

/**
 * Define all allowed `video` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`, `width`, `height`
 */
export const VideoFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields, ...SizeFields];

/**
 * The interface `VideoNode` defines all attribute types for `video`:
 * `CDATA`, `NMTOKEN`
 */
export interface VideoNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode, SizeNode { }

/**
 * Check if the given attributes of the `video` node are valid
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidVideoField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value)
  || isValidSizeField(field, value);

/**
 * Check if the `video` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `video` node to test
 * @returns Boolean
 */
export const isVideoNode = (value?: {}): value is VideoNode =>
  typeof value === 'object' && areFieldsValid(VideoFields, value, isValidVideoField);

/**
 * Construct a `video` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `video` node
 */
export function makeVideo<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass, makeSize);
}

/**
 * Create a video node
 *
 * @decorator `@makeComponent`
 * @param makeVideo - The `video` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidVideoField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @See {@link VideoFields}
 * @param childNodes - An Array of allowed child nodes: desc?', `video-poster?`, `media-controls?`, `media-autoplay?`, `media-loop?`, `media-muted?`, `media-source*`, `media-track*`
 */
@makeComponent(makeVideo, 'video', isValidVideoField, VideoFields, ['desc?', 'video-poster?', 'media-controls?', 'media-autoplay?', 'media-loop?', 'media-muted?', 'media-source*', 'media-track*'])
export class VideoNode extends BaseNode {}