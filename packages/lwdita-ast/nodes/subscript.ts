import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { BasicValue } from "@jdita/lwdita-xdita/classes";

/**
 * Define all allowed `subscript` attributes:
 * `dir`, `xml:lang`, `translate`, `keyref`, `class`, `outputclass`
 */
export const SubscriptFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface SubscriptNode defines the attribute types for `subscript`:
 * `CDATA`, `NMTOKEN`
 */
export interface SubscriptNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given attributes of the `subscript` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidSubscriptField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `subscript` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `subscript` node to test
 * @returns Boolean
 */
export const isSubscriptNode = (value?: {}): value is SubscriptNode =>
  typeof value === 'object' && areFieldsValid(SubscriptFields, value, isValidSubscriptField);

/**
 * Construct a `subscript` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `subscript` node
 */
export function makeSubscript<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

/**
 * Create a `subscript` node and map the `subscript` node with the LwDita tag name `sb`
 *
 * @privateRemarks
 * TODO: Implement "+ topic/ph hi-d/sub "
 *
 * @decorator `@makeComponent`
 * @param makeSubscript - The `subscript` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidSubscriptField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link SubscriptFields}
 * @param childNodes - An Array of allowed child nodes: `%all-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `xref`, `data`)
 */
@makeComponent(makeSubscript, 'sub', isValidSubscriptField, SubscriptFields, ['%all-inline*'])
export class SubscriptNode extends BaseNode {
  static domNodeName = 'sub';
}