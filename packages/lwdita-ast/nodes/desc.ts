import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "@jdita/lwdita-xdita/classes";

/**
 * Define all allowed `desc` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `outputclass`, `class`,
 */
export const DescFields = [...FiltersFields, ...LocalizationFields, ...ClassFields];

/**
 * Interface DescNode defines the attribute types for `desc`
 */
export interface DescNode extends FiltersNode, LocalizationNode, ClassNode { }

/**
 * Check if the given attributes of the `desc` node are valid and match this list:
 * See {@link DescFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidDescField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `desc` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `desc` node to test
 * @returns Boolean
 */
export const isDescNode = (value?: {}): value is DescNode =>
  typeof value === 'object' && areFieldsValid(DescFields, value, isValidDescField);

/**
 * Construct a `desc` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `desc` node
 */
export function makeDesc<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeClass);
}
/**
 * Create a `desc` node
 *
 * @privateRemarks
 * TODO: Implement caption/figcaption
 *
 * @decorator `@makeComponent`
 * @param makeDesc - The `Desc` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDescField - A boolean value, if the attribute is valid or not
 * @param DescFields - An array containing all valid attribute names @See {@link DescFields}
 * @param childNodes - An array containing all valid child node names: `%common-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `data`)
 * @returns A `desc` node
 */
@makeComponent(makeDesc, 'desc', isValidDescField, DescFields, ['%common-inline*'])
export class DescNode extends BaseNode {
  static domNodeName = 'caption';
}