import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "@jdita/lwdita-xdita/classes";

/**
 * Define all allowed `audio` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `keyref`, `id`, `conref`, `outputclass`, `class`
 */
export const AudioFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface AudioNode defines the attribute types for `audio`:
 */
export interface AudioNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given attributes of the `audio` node are valid and match this list:
 * `props`, `dir`, `xml:lang`, `translate`, `keyref`, `id`, `conref`, `outputclass`, `class`
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidAudioField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `audio` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `audio` node to test
 * @returns Boolean
 */
export const isAudioNode = (value?: {}): value is AudioNode =>
  typeof value === 'object' && areFieldsValid(AudioFields, value, isValidAudioField);

/**
 * Construct an `audio` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `audio` node
 * */
export function makeAudio<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create an `audio` node
 *
 * @decorator `@makeComponent`
 * @param makeAudio - The `audio` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidAudioField - A boolean value, if the attribute is valid or not
 * @param AudioFields - An array containing all valid attribute names
 * @param childNodes - An array containing all valid child node names: `desc?`, `media-controls?`, `media-autoplay?`, `media-loop?`, `media-muted?`, `media-source*`, `media-track*`
 */
@makeComponent(makeAudio, 'audio', isValidAudioField, AudioFields, ['desc?', 'media-controls?', 'media-autoplay?', 'media-loop?', 'media-muted?', 'media-source*', 'media-track*'])
export class AudioNode extends BaseNode {}