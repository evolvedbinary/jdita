import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "@jdita/lwdita-xdita/classes";

/**
 * Define all allowed `li` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const LiFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface LiNode defines the attribute types for `li`
 */
export interface LiNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given attributes of the `li` node are valid and match this list:
 * @See {@link LiFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidLiField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `li` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `li` node to test
 * @returns Boolean
 */
export const isLiNode = (value?: {}): value is LiNode =>
  typeof value === 'object' && areFieldsValid(LiFields, value, isValidLiField);

/**
 * Construct a `li` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `li` node
 */
export function makeLi<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `li` node
 *
 * @decorator `@makeComponent`
 * @param makeLi - The `li` node constructor
 * @param nodeName - A string containing the node name 'li'
 * @param isValidLiField - A function to check if the attribute is valid see {@link isValidLiField}
 * @param LiFields - A list of valid attributes `%list-blocks*` (`p`, `ul`, `ol`, `dl`, `pre`, `audio`, `video`, `simpletable`, `fig`, `note`, `data`)
 * @returns A `li` node
 */
@makeComponent(makeLi, 'li', isValidLiField, LiFields, ['%list-blocks*'])
export class LiNode extends BaseNode {
  static domNodeName = 'li';
}