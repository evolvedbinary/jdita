import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { ReuseNode, isValidReuseField, ReuseFields, makeReuse } from "./reuse";
import { BasicValue } from "@jdita/lwdita-xdita/classes";

/**
 * Define all allowed `dlentry` fields:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const DlEntryFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface DlEntryNode defines the attribute types for `dlentry`
 */
export interface DlEntryNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given attributes of the `dlentry` node are valid and match this list:
 * @See {@link DlEntryFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidDlEntryField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `display` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `display` node to test
 * @returns Boolean
 */
export const isDlEntryNode = (value?: {}): value is DlEntryNode =>
  typeof value === 'object' && areFieldsValid(DlEntryFields, value, isValidDlEntryField);

/**
 * Construct a `dlentry` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `dlentry` node
 */
export function makeDlEntry<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `dlentry` node
 *
 * @privateRemarks
 * TODO: To be removed, make changes to `dl`
 * TODO (Y.): Why is `domNodeName` set to an empty string?
 *
 * @decorator `@makeComponent`
 * @param makeDlEntry - The `dlEntry` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDlEntryField - A boolean value, if the attribute is valid or not
 * @param DlEntryFields - An array containing all valid attribute names @see {@link DlEntryFields}
 * @param childNodes - An array containing all valid child node names: `%common-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `data`)
 * @returns A `dlentry` node
 */
@makeComponent(makeDlEntry, 'dlentry', isValidDlEntryField, DlEntryFields, ['dt', 'dd'])
export class DlEntryNode extends BaseNode {
  static domNodeName = '';
}