import { isOrUndefined, areFieldsValid } from "@jdita/lwdita-xml/utils";
import { BaseNode } from "./base";
import { BasicValue } from "@jdita/lwdita-xml/classes";
import { CDATA, isCDATA } from "../ast-classes";

/**
 * FnReuseFields: `conref`
 */
export const FnReuseFields = ['conref'];

/**
 * FnReuseNode: `conref`
 */
export interface FnReuseNode {
  'conref'?: CDATA;
}

/**
 * Check if the given attributes of the `fn-reuse` node are valid and match this list:
 * @See {@link FnReuseFields}
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export function isValidFnReuseField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'conref': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `fn-reuse` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `fn-reuse` node to test
 * @returns Boolean
 */
export const isFnReuseNode = (value?: {}): value is FnReuseNode =>
  typeof value === 'object' && areFieldsValid(FnReuseFields, value, isValidFnReuseField);

/**
 * Create a `fn-reuse` node with a `conref` attribute
 *
 * @param constructor - The constructor
 * @returns The `fn-reuse` node with a `conref` attribute and its value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeFnReuse<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements FnReuseNode {
    get 'conref'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('conref');
    }
    set 'conref'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('conref', value);
    }
  }
}