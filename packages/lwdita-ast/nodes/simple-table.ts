import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "@jdita/lwdita-xdita/classes";

/**
 * Define all allowed `simpletable` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`
 */
export const SimpleTableFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface StEntryNode defines the attribute types for `simpletable`:
 * `CDATA`, `NMTOKEN`
 */
export interface SimpleTableNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given attributes of the `simpletable` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidSimpleTableField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `simpletable` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `simpletable` node to test
 * @returns Boolean
 */
export const isSimpleTableNode = (value?: {}): value is SimpleTableNode =>
  typeof value === 'object' && areFieldsValid(SimpleTableFields, value, isValidSimpleTableField);

/**
 * Construct a `simpletable` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `simpletable` node
 */
export function makeSimpleTable<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `simpletable` node (table) and map the `simpletable` node with the LwDita tag name `table`
 *
 * @decorator `@makeComponent`
 * @param makeSimpleTable - The `simpletable` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidSimpleTableField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link SimpleTableFields}
 * @param childNodes - An Array of allowed child nodes `sthead?`, `strow+`
 */
@makeComponent(makeSimpleTable, 'simpletable', isValidSimpleTableField, SimpleTableFields, ['sthead?', 'strow+'])
export class SimpleTableNode extends BaseNode {
  static domNodeName = 'table';
}