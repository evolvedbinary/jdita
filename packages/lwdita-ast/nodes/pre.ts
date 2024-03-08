import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, isOrUndefined } from "@jdita/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll } from "./base";
import { BasicValue } from "@jdita/lwdita-xdita/classes";
import { CDATA, isCDATA } from "../ast-classes";

/**
 * Define all allowed `pre` fields:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`, `xml:space`
 */
export const PreFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields, 'xml:space'];

/**
 * Interface PreNode defines the attribute types for `pre`:
 * `CDATA`, `NMTOKEN`
 */
export interface PreNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given fields of the `pre` node are valid
 *
 * @privateRemarks
 * TODO: Implement field validation for `xml:space` (preserve)
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidPreField = (field: string, value: BasicValue): boolean => {
  if (isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value)) {
    return true;
  }
  switch (field) {
    case 'xml:space': return isOrUndefined(isCDATA, value);
    default: return false;
  }
};

/**
 * Check if the `pre` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `pre` node to test
 * @returns Boolean
 */
export const isPreNode = (value?: {}): value is PreNode =>
  typeof value === 'object' && areFieldsValid(PreFields, value, isValidPreField);

/**
 * Construct a `pre` node with all available attributes
 *
 * @remarks
 * eslint-disable-next-line `@typescript-eslint/no-explicit-any`
 *
 * @param constructor - The constructor
 * @returns An `pre` node
 */
export function makePre<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return makeAll(class extends constructor {
    get 'xmlns:space'(): CDATA {
      return this.readProp<CDATA>('xmlns:space'); }
    set 'xmlns:space'(value: CDATA) {
        this.writeProp<CDATA>('xmlns:space', value); }
  }, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `pre` node (preformatted text) and map the `pre` node with the LwDita tag name `pre`
 *
 * @privateRemarks
 * TODO (A.): Is the syntax of the child nodes array [[...]] really correct?
 * TODO (Y.): Alex is correct and this needs to be fixed
 *
 * @decorator `@makeComponent`
 * @param makePre - The `pre` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidPreField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @See {@link PreFields}
 * @param childNodes - An Array of allowed child nodes `text*`, `%ph*`, `xref*`, `%data*`
 */
@makeComponent(makePre, 'pre', isValidPreField, PreFields, [['text*', '%ph*', 'xref*', '%data*']])
export class PreNode extends BaseNode {
  static domNodeName = 'pre';
}