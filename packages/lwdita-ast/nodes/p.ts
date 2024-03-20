import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xml/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "@jdita/lwdita-xml/classes";

/**
 * Define all allowed `p` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `'id`, `conref'`, `class`, `outputclass`
 */
export const PFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface PhNode defines the attribute types for `p`:
 * `CDATA`, `NMTOKEN`
 */
export interface PNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given attributes of the `p` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidPField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `p` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `p` node to test
 * @returns Boolean
 */
export const isPNode = (value?: {}): value is PNode =>
  typeof value === 'object' && areFieldsValid(PFields, value, isValidPField);

/**
 * Construct a `p` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `p` node
 */
export function makeP<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `p` node (paragraph) and map the `p` node with the LwDita tag name `p`
 *
 * @decorator `@makeComponent`
 * @param makeP - The `p` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidPField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @See {@link PFields}
 * @param childNodes - An Array of allowed child nodes `%all-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `xref`, `data`)
 */
@makeComponent(makeP, 'p', isValidPField, PFields, ['%all-inline*'])
export class PNode extends BaseNode {
  static domNodeName = 'p';
}