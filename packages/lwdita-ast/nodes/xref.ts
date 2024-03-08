import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { ReferenceContentFields, ReferenceContentNode, isValidReferenceContentField, makeReferenceContent } from "./reference-content";
import { VariableContentFields, VariableContentNode, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { BasicValue } from "@jdita/lwdita-xdita/classes";

/**
 * Define all allowed `xref` (cross-reference) attributes:
 * `keyref`, `href`, `format`, `scope`, `outputclass`, `class`, `dir`, `xml:lang`, `translate`, `props`
 */
export const XRefFields = [...FiltersFields, ...LocalizationFields, ...ClassFields, ...ReferenceContentFields, ...VariableContentFields];

/**
 * Interface XRefNode defines the attribute types for `xref`:
 * `CDATA`, `local` | `peer` | `external`
 */
export interface XRefNode extends FiltersNode, LocalizationNode, ClassNode, ReferenceContentNode, VariableContentNode { }

/**
 * Check if the given attributes of the `xref` node are valid
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidXRefField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value)
  || isValidReferenceContentField(field, value)
  || isValidVariableContentField(field, value);

/**
 * Check if the `xref` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `xref` node to test
 * @returns Boolean
 */
export const isXRefNode = (value?: {}): value is XRefNode =>
  typeof value === 'object' && areFieldsValid(XRefFields, value, isValidXRefField);

/**
 * Construct an `xref` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `xref` node
 */
export function makeXRef<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeClass, makeReferenceContent, makeVariableContent);
}

/**
 * Create an xref node (cross reference) and map the `xref` node with the LwDita tag name `a`
 *
 * @decorator `@makeComponent`
 * @param makeXRef - The `xref` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidXRefField - A boolean value, if the attributes is valid or not
 * @param fields - A List of valid attributes @see {@link XRefFields}
 * @param childNodes - An Array of allowed child node `%common-inline*`: `text`, `ph`, `b`, `i`, `u`, `sub`, `sup` , `image`, `data`
 */
@makeComponent(makeXRef, 'xref', isValidXRefField, XRefFields, ['%common-inline*'])
export class XRefNode extends BaseNode {
  static domNodeName = 'a';
}