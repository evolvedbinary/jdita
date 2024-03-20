import { isOrUndefined, areFieldsValid } from "@jdita/lwdita-xml/utils";
import { BaseNode } from "./base";
import { BasicValue } from "@jdita/lwdita-xml/classes";
import { CDATA, isCDATA } from "../ast-classes";


/**
 * Define all allowed `variable-content` attributes:
 * The only allowed field is `keyref`
 */
export const VariableContentFields = ['keyref'];

/**
 * The interface `VariableContentNode` defines the attribute type for `variable-content`: 'CDATA'
 */
export interface VariableContentNode {
  'keyref'?: CDATA;
}

/**
 * Check if the attributes `keyref` of the `variable-content` node is valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export function isValidVariableContentField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'keyref': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `variable-content` node is valid
 *
 * @remarks
 * Assert that the node is an object and has a valid attribute
 *
 * @param value - The `variable-content` node to test
 * @returns Boolean
 */
export const isVariableContentNode = (value?: {}): value is VariableContentNode =>
  typeof value === 'object' && areFieldsValid(VariableContentFields, value, isValidVariableContentField);

/**
 * Create a `variable-content` node with a `keyref` attribute
 *
 * @param constructor - The constructor
 * @returns The `variable-content` node with a `keyref` attribute and its value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeVariableContent<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements VariableContentNode {
    get 'keyref'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('keyref');
    }
    set 'keyref'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('keyref', value);
    }
  }
}