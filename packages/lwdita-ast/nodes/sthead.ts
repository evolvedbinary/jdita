import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "@jdita/lwdita-xdita/classes";

/**
 * Define all allowed `sthead` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`
 */
export const StHeadFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface StHeadNode defines the attribute types for `sthead`:
 * `CDATA`, `NMTOKEN`
 */
export interface StHeadNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given attributes of the `sthead` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidStHeadField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `sthead` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `sthead` node to test
 * @returns Boolean
 */
export const isStHeadNode = (value?: {}): value is StHeadNode =>
  typeof value === 'object' && areFieldsValid(StHeadFields, value, isValidStHeadField);

/**
 * Construct a `sthead` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `sthead` node
 */
export function makeStHead<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `sthead` node (simple table header) and map the `sthead` node with the LwDita tag name `thead`
 *
 * @decorator `@makeComponent`
 * @param makeStHead - The `sthead` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidStHeadField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes
 * @param childNodes - An Array of allowed child node `stentry+`
 */
@makeComponent(makeStHead, 'sthead', isValidStHeadField, StHeadFields, ['stentry+'])
export class StHeadNode extends BaseNode {
  static domNodeName = 'thead';
}