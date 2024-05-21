import { isOrUndefined, areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { BaseNode } from "./base";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { NMTOKEN, isNMTOKEN } from "../ast-classes";


/**
 * Define all allowed `size` attributes:
 * `width`, `height`
 */
export const SizeFields = ['width', 'height'];

/**
 * Interface SizeNode defines the attribute type for `size`: `NMTOKEN`
 */
export interface SizeNodeAttributes {
  'width'?: NMTOKEN;
  'height'?: NMTOKEN;
}

/**
 * Check if the given attributes of the `size` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export function isValidSizeField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'width': return isOrUndefined(isNMTOKEN, value);
    case 'height': return isOrUndefined(isNMTOKEN, value);
    default: return false;
  }
}

/**
 * Check if the `size` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `size` node to test
 * @returns Boolean
 */
export const isSizeNode = (value?: unknown): value is SizeNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(SizeFields, value as Record<string, BasicValue>, isValidSizeField);

/**
 * Create a `size` node with a `width` and `height` attribute
 *
 * @param constructor - The constructor
 * @returns The `size` node with a `width` and `height` attribute and their values
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeSize<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements SizeNodeAttributes {
    get 'width'(): NMTOKEN | undefined {
      return this.readProp<NMTOKEN | undefined>('width');
    }
    set 'width'(value: NMTOKEN | undefined) {
      this.writeProp<NMTOKEN | undefined>('width', value);
    }
    get 'height'(): NMTOKEN | undefined {
      return this.readProp<NMTOKEN | undefined>('height');
    }
    set 'height'(value: NMTOKEN | undefined) {
      this.writeProp<NMTOKEN | undefined>('height', value);
    }
  }
}