import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "@jdita/lwdita-xdita/classes";

/**
 * Define all allowed `shortdesc` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `class`, `outputclass`
 */
export const ShortDescFields = [...FiltersFields, ...LocalizationFields, ...ClassFields];

/**
 * Interface ShortDescNode defines the attribute types for `shortdesc`: `CDATA`
 */
export interface ShortDescNode extends FiltersNode, LocalizationNode, ClassNode { }

/**
 * Check if the given attributes of the `shortdesc` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidShortDescField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `shortdesc` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `shortdesc` node to test
 * @returns Boolean
 */
export const isShortDescNode = (value?: {}): value is ShortDescNode =>
  typeof value === 'object' && areFieldsValid(ShortDescFields, value, isValidShortDescField);

/**
 * Construct a `shortdesc` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `shortdesc` node
 */
export function makeShortDesc<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeClass);
}

/**
 * Create a `shortdesc` node (short description) and map the `shortdesc` node with the LwDita tag name `p`
 *
 * @decorator `@makeComponent`
 * @param makeshortdesc - The `shortdesc` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidSimpleTableField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes
 * @param childNodes - An Array of allowed child node `%all-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `xref`, `data`)
 */
@makeComponent(makeShortDesc, 'shortdesc', isValidShortDescField, ShortDescFields, ['%all-inline*'])
export class ShortDescNode extends BaseNode {
  static domNodeName = 'p';
}