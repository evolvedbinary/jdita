import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "@jdita/lwdita-xml/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "@jdita/lwdita-xml/classes";

/**
 * Define all allowed `dl` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const DlFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface DlNode defines the attribute types for `dl`
 */
export interface DlNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given attributes of the `dl` node are valid and match this list:
 * @See {@link DlFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidDlField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `dl` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `dl` node to test
 * @returns Boolean
 */
export const isDlNode = (value?: {}): value is DlNode =>
  typeof value === 'object' && areFieldsValid(DlFields, value, isValidDlField);

/**
 * Construct a `dl` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `dl` node
 */
export function makeDl<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `dl` node
 *
 * @decorator `@makeComponent`
 * @param makeDl - The `dl` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDlField - A boolean value, if the attribute is valid or not
 * @param DlFields - An array containing all valid attribute names @See {@link DlFields}
 * @param childNodes - An array containing all valid child node names: `dlentry+`
 * @returns A `dl` node
 */
@makeComponent(makeDl, 'dl', isValidDlField, DlFields, ['dlentry+'])
export class DlNode extends BaseNode {
  static domNodeName = 'dl';
}