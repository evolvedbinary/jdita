import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { VariableContentNode, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xml/utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "@jdita/lwdita-xml/classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `ph` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `keyref`, `class`, `outputclass`
 */
export const PhFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface PhNode defines the attribute type for `ph`: `CDATA`
 */
export interface PhNodeInterface extends FiltersNode, LocalizationNode, VariableContentNode, ClassNode { }

/**
 * Check if the given attributes of the `ph` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidPhField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `ph` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `ph` node to test
 * @returns Boolean
 */
export const isPhNode = (value?: {}): value is PhNode =>
  typeof value === 'object' && areFieldsValid(PhFields, value as Record<string, BasicValue>, isValidPhField);

/**
 * Construct a `ph` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `ph` node
 */
export function makePh<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeVariableContent, makeClass);
}

/**
 * Create a `ph` node (phrase) and map the `ph` node with the LwDita tag name `span`
 *
 * @decorator `@makeComponent`
 * @param makePh - The `ph` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidPhField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link PhFields}
 * @param childNodes - An Array of allowed child node `%all-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `xref`, `data`)
 */
@makeComponent(makePh, 'ph', isValidPhField, PhFields, ['%all-inline*'])
export class PhNode extends BaseNode implements PhNodeInterface {
  static domNodeName = 'span';
  // `props`, `dir`, `xml:lang`, `translate`, `keyref`, `class`, `outputclass`
  "props"?: CDATA;
  "dir"?: CDATA;
  "xml:lang"?: CDATA;
  "translate"?: CDATA;
  "keyref"?: CDATA;
  "outputclass"?: CDATA;
  "class"?: CDATA;
}