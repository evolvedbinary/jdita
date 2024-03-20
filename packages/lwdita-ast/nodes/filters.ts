import { isOrUndefined, areFieldsValid } from "@jdita/lwdita-xml/utils";
import { FiltersAddsNode, FiltersAddsFields } from "./filters-adds";
import { BaseNode } from "./base";
import { BasicValue } from "@jdita/lwdita-xml/classes";
import { CDATA, isCDATA } from "../ast-classes";


/**
 * FiltersFields: `props`
 */
export const FiltersFields = [...FiltersAddsFields, 'props'];

/**
 * FiltersNode: `props`
 */
export interface FiltersNode extends FiltersAddsNode {
  'props'?: CDATA;
}

/**
 * Check if the given fields of the `filter` node are valid and matches this list:
 * @See {@link FiltersFields}
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export function isValidFiltersField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'props': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `filter` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `filter` node to test
 * @returns Boolean
 */
export const isFiltersNode = (value?: {}): value is FiltersNode =>
  typeof value === 'object' && areFieldsValid(FiltersFields, value, isValidFiltersField);

/**
 * Create a `filter` node with an `props` attribute
 *
 * @param constructor - The constructor
 * @returns The `filter` node with an `props` attribute and their values
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeFilters<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements FiltersNode {
    get 'props'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('props');
    }
    set 'props'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('props', value);
    }
  }
}