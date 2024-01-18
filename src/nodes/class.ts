import { isOrUndefined, areFieldsValid } from "../utils";
import { BaseNode } from "./base";
import { CDATA, BasicValue, isCDATA } from "../classes";

/**
 * ClassFields (universal attributes): `outputclass`, `class`
 */
export const ClassFields = ['outputclass', 'class'];

/**
 * Interface ClassNode defines the attribute types
 */
export interface ClassNode {
  'outputclass'?: CDATA;
  'class'?: CDATA;
}

/**
 * Check if the attributes `outputclass`, `class` are valid
 *
 * @See {@link ClassFields}
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export function isValidClassField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'outputclass': return isOrUndefined(isCDATA, value);
    case 'class': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `class` attribute is valid
 *
 * @param value - The `class` node to test
 * @returns Boolean
 */
export const isClassNode = (value?: {}): value is ClassNode =>
  typeof value === 'object' && areFieldsValid(ClassFields, value, isValidClassField);


/**
 * Create a `class` node (universal attribute)
 * This will be transformed to an HTML attribute e.g. `class=""`
 *
 * @see {@link https://dita-lang.org/lwdita/commonspec/specification/langref/attributes/attribute-groups#attribute-groups__universal-attributes}
 *
 * @remarks
 * eslint-disable-next-line `@typescript-eslint/no-explicit-any`
 *
 * @param constructor - The constructor
 * @returns The `class` node
 */
export function makeClass<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements ClassNode {
    get 'outputclass'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('outputclass');
    }
    set 'outputclass'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('outputclass', value);
    }
    get 'class'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('class');
    }
    set 'class'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('class', value);
    }
  }
}