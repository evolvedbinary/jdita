import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { BasicValue } from "@jdita/lwdita-xdita/classes";

/** TODO: Implement "+ topic/ph hi-d/b " */

/**
 * Define all allowed `bold` attributes:
 * `dir`, `xml:lang`, `translate`, `keyref`, `outputclass`, `class`
 */
export const BoldFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface BoldNode defines the attribute types for `bold`
 */
export interface BoldNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given attributes of the `bold` node are valid and match this list:
 * @See {@link BoldFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidBoldField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `bold` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `bold` node to test
 * @returns Boolean
 */
export const isBoldNode = (value?: {}): value is BoldNode =>
  typeof value === 'object' && areFieldsValid(BoldFields, value, isValidBoldField);

/**
 * Construct a `bold` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `bold` node
 * */
export function makeBold<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

/**
 * Create a `bold` node (link) and map the `bold` node with the LwDita tag name `b`
 *
 * @decorator `@makeComponent`
 * @param makeBold - The `Bold` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidBodyField - A boolean value, if the attribute is valid or not
 * @param BodyFields - An array containing all valid attribute names
 * @param childNodes - An array containing all valid child node names: `%all-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `xref`, `data`)
*/
@makeComponent(makeBold, 'b', isValidBoldField, BoldFields, ['%all-inline*'])
export class BoldNode extends BaseNode {
  static domNodeName = 'b';
}