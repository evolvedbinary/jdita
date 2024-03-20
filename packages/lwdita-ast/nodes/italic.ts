import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xml/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { BasicValue } from "@jdita/lwdita-xml/classes";

/**
 * Define all allowed `i` attributes:
 * `dir`, `xml:lang`, `translate`, `keyref`, `outputclass`, `class`
 */
export const ItalicFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface ItalicNode defines the attribute types for `i`
 */
export interface ItalicNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given attributes of the `italic` node are valid and match this list:
 * @See {@link ItalicFields}
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidItalicField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `italic` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `italic` node to test
 * @returns Boolean
 */
export const isItalicNode = (value?: {}): value is ItalicNode =>
  typeof value === 'object' && areFieldsValid(ItalicFields, value, isValidItalicField);

/**
 * Construct an `italic` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `italic` node
 */
export function makeItalic<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

/**
 * Create an italic node
 *
 * @privateRemarks
 * TODO: Implement "+ topic/ph hi-d/i"
 *
 * @decorator `@makeComponent`
 * @param makeItalic - The `italic` node constructor
 * @param nodeName - A string containing the node name 'i'
 * @param isValidItalicField - A function to check if the field is valid see {@link isValidItalicField}
 * @param ItalicFields - A list of valid fields `%all-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `xref`, `data`)
 * @returns A decorator
 */
@makeComponent(makeItalic, 'i', isValidItalicField, ItalicFields, ['%all-inline*'])
export class ItalicNode extends BaseNode {
  static domNodeName = 'i';
}