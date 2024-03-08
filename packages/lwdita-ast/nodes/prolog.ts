import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, isOrUndefined } from "@jdita/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll } from "./base";
import { BasicValue } from "@jdita/lwdita-xdita/classes";
import { CDATA, isCDATA } from "../ast-classes";

/**
 * Define all allowed `prolog` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `class`
 */
export const PrologFields = [...FiltersFields, ...LocalizationFields, 'class'];

/**
 * Interface PrologNode defines the attribute type for `prolog`: `CDATA`
 */
export interface PrologNode extends FiltersNode, LocalizationNode {
  'class'?: CDATA;
}

/**
 * Check if the given attributes of the `prolog` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export function isValidPrologField(field: string, value: BasicValue): boolean {
  if (isValidFiltersField(field, value) || isValidLocalizationField(field, value)) {
    return true;
  }
  switch (field) {
    case 'class': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `prolog` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `prolog` node to test
 * @returns Boolean
 */
export const isPrologNode = (value?: {}): value is PrologNode =>
  typeof value === 'object' && areFieldsValid(PrologFields, value, isValidPrologField);

/**
 * Construct a `prolog` node with all available attributes
 *
 * @remarks
 * eslint-disable-next-line `@typescript-eslint/no-explicit-any`
 *
 * @param constructor - The constructor
 * @returns A `prolog` node
 */
export function makeProlog<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return makeAll(class extends constructor {
    get 'class'(): CDATA {
      return this.readProp<CDATA>('class');
    }
    set 'class'(value: CDATA) {
      this.writeProp<CDATA>('class', value);
    }
  }, makeLocalization, makeFilters);
}

/**
 * Create a `prolog` node
 *
 * @remarks
 * Delete the default tag name from the BaseNode
 *
 * @privateRemarks
 * Is overriding the domNodeName with an empty string intended??
 * TODO: Implement `head > meta`
 * TODO (Y.): Why is `domNodeName` set to an empty string?
 *
 * @decorator `@makeComponent`
 * @param makeProlog - The `prolog` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidPrologField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @See {@link PrologFields}
 * @param childNodes - An Array of allowed child nodes: `%data*`
 */
@makeComponent(makeProlog, 'prolog', isValidPrologField, PrologFields, ['%data*'])
export class PrologNode extends BaseNode {
  static domNodeName = '';
}