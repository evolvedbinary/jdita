import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { BasicValue } from "@jdita/lwdita-xdita/classes";

/**
 * Define all allowed `underlined` attributes:
 * `dir`, `xml:lang`, `translate`, `keyref`, `class`, `outputclass`
 */
export const UnderlinedFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface UnderlinedNode defines the attribute types for `underlined`:
 * `CDATA`, `NMTOKEN`
 */
export interface UnderlinedNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given attributes of the `underlined` node are valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export const isValidUnderlinedField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `underlined` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `underlined` node to test
 * @returns Boolean
 */
export const isUnderlinedNode = (value?: {}): value is UnderlinedNode =>
  typeof value === 'object' && areFieldsValid(UnderlinedFields, value, isValidUnderlinedField);

/**
 * Construct an `underlined` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `underlined` node
 */
export function makeUnderlined<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

/**
 * Create an `underlined` node and map the `underlined` node with the LwDita tag name `u`
 *
 * @privateRemarks
 * TODO: Implement "+ topic/ph hi-d/u "
 *
 * @decorator `@makeComponent`
 * @param makeUnderlined - The `underlined` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidUnderlinedField - A boolean value, if the attributes is valid or not
 * @param fields - A List of valid attributes @See {@link UnderlinedFields}
 * @param childNodes - An Array of allowed child node `%all-inline*`
 */
@makeComponent(makeUnderlined, 'u', isValidUnderlinedField, UnderlinedFields, ['%all-inline*'])
export class UnderlinedNode extends BaseNode {
  static domNodeName = 'u';
}