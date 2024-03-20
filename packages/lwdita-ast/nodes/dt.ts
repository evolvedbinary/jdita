import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xml/utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { ReuseFields, ReuseNode, isValidReuseField, makeReuse } from "./reuse";
import { BasicValue } from "@jdita/lwdita-xml/classes";

/**
 * Define all allowed `dt` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const DtFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface DtNode defines the attribute types for `dt`
 */
export interface DtNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given attributes of the `dt` node are valid and match this list:
 * @See {@link DtFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidDtField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `dt` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `dt` node to test
 * @returns Boolean
 */
export const isDtNode = (value?: {}): value is DtNode =>
  typeof value === 'object' && areFieldsValid(DtFields, value, isValidDtField);

/**
 * Construct a `dt` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `dt` node
 */
export function makeDt<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `dt` node
 *
 * @decorator `@makeComponent`
 * @param makeDt - The `dt` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDtField - A boolean value, if the attribute is valid or not
 * @param DtFields - An array containing all valid attribute names @See {@link DtFields}
 * @param childNodes - An array containing all valid child node names: `%common-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `data`)
 * @returns A `dt` node
 */
@makeComponent(makeDt, 'dt', isValidDtField, DtFields, ['%all-inline*'])
export class DtNode extends BaseNode {
  static domNodeName = 'dt';
}