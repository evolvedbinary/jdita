import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xml/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { BasicValue } from "@jdita/lwdita-xml/classes";

/**
 * Define all allowed `superscript` attributes:
 * `dir`, `xml:lang`, `translate`, `keyref`, `class`, `outputclass`
 */
export const SuperscriptFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface SuperscriptNode defines the attribute types for `superscript`:
 * `CDATA`, `NMTOKEN`
 */
export interface SuperscriptNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given attributes of the `superscript` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidSuperscriptField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `superscript` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `superscript` node to test
 * @returns Boolean
 */
export const isSuperscriptNode = (value?: {}): value is SuperscriptNode =>
  typeof value === 'object' && areFieldsValid(SuperscriptFields, value, isValidSuperscriptField);

/**
 * Construct a `superscript` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `superscript` node
 */
export function makeSuperscript<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

/**
 * Create a `superscript` node and map the `superscript` node with the LwDita tag name `sup`
 *
 * @privateRemarks
 * TODO: Implement "+ topic/ph hi-d/sup "
 *
 * @decorator `@makeComponent`
 * @param makeSuperscript - The `superscript` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidSuperscriptField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @see {@link SuperscriptFields}
 * @param childNodes - An Array of allowed child nodes: `%all-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `xref`, `data`)
 */
@makeComponent(makeSuperscript, 'sup', isValidSuperscriptField, SuperscriptFields, ['%all-inline*'])
export class SuperscriptNode extends BaseNode {
  static domNodeName = 'sup';
}