import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReferenceContentNode, ReferenceContentFields, isValidReferenceContentField, makeReferenceContent } from "./reference-content";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, VariableContentNode, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { FieldFields, FieldNode, isValidCDATAFieldField, makeCDATAField } from "./field";
import { BasicValue } from "@jdita/lwdita-xdita/classes";

/**
 * Define all allowed `data` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `href`, `format`, `scope`, `outputclass`, `class`, `keyref`
 */
export const DataFields = [...FiltersFields, ...LocalizationFields, ...ReferenceContentFields, ...ClassFields, ...VariableContentFields, ...FieldFields];

/**
 * Interface DataNode defines the attribute types for `data`:
 */
export interface DataNode extends FiltersNode, LocalizationNode, ReferenceContentNode, ClassNode, VariableContentNode, FieldNode { }

/**
 * Check if the given attributes of the `data` node are valid and match this list:
 * @See {@link DataFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidDataField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReferenceContentField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value)
  || isValidCDATAFieldField(field, value);

/**
 * Check if the `data` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `data` node to test
 * @returns Boolean
 */
export const isDataNode = (value?: {}): value is DataNode =>
  typeof value === 'object' && areFieldsValid(DataFields, value, isValidDataField);

/**
 * Construct a `data` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `data` node
 */
export function makeData<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReferenceContent, makeClass, makeVariableContent, makeCDATAField);
}

/**
 * Create a `data` node
 *
 * @decorator `@makeComponent`
 * @param makeData - The `data` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDataField - A boolean value, if the attribute is valid or not
 * @param DataFields - An array containing all valid attribute names
 * @param childNodes - An array containing all valid child node names: `text*`, `%data*`
 */
@makeComponent(makeData, 'data', isValidDataField, DataFields, [['text*', '%data*']])
export class DataNode extends BaseNode {
  static domNodeName = 'data';
}