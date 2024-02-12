import { isOrUndefined, areFieldsValid } from "@jdita/lwdita-xml/utils";
import { BaseNode } from "./base";
import { BasicValue } from "@jdita/lwdita-xml/classes";
import { CDATA, NMTOKEN, isCDATA, isNMTOKEN } from "../ast-classes";


/**
 * Define all allowed `reuse` attributes:
 * `id`, `conref`
 */
export const ReuseFields = ['id', 'conref'];

/**
 * Interface reuseNode defines the attribute types for `reuse`:
 * `CDATA`, `NMTOKEN`
 */
export interface ReuseNode {
  'id'?: NMTOKEN;
  'conref'?: CDATA;
}

/**
 * Check if the given attributes of the `reuse` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export function isValidReuseField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'id': return isOrUndefined(isNMTOKEN, value);
    case 'conref': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `reuse` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `reuse` node to test
 * @returns Boolean
 */
export const isReuseNode = (value?: {}): value is ReuseNode =>
  typeof value === 'object' && areFieldsValid(ReuseFields, value, isValidReuseField);

/**
 * Create a `reuse` node with an `id` and `conref` attribute
 *
 * @param constructor - The constructor
 * @returns The `reuse` node with an `id` and `conref` attribute and their values
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeReuse<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements ReuseNode {
    get 'id'(): NMTOKEN | undefined {
      return this.readProp<NMTOKEN | undefined>('id');
    }
    set 'id'(value: NMTOKEN | undefined) {
      this.writeProp<NMTOKEN | undefined>('id', value);
    }
    get 'conref'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('conref');
    }
    set 'conref'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('conref', value);
    }
  }
}