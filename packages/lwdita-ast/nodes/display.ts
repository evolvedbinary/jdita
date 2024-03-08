import { isOrUndefined, areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { BaseNode } from "./base";
import { BasicValue } from "@jdita/lwdita-xdita/classes";
import { DisplayExpanse, DisplayFrame, DisplayScale, isDisplayExpanse, isDisplayFrame, isDisplayScale } from "../ast-classes";


/**
 * DisplayFields (display attributes): `scale`, `frame`, `expanse`
 */
export const DisplayFields = ['scale', 'frame', 'expanse'];

/**
 * Interface DisplayNode defines the attribute types
 */
export interface DisplayNode {
  'scale'?: DisplayScale;
  'frame'?: DisplayFrame;
  'expanse'?: DisplayExpanse;
}

/**
 * Check if the attributes `scale`, `frame`, `expanse` are valid
 *
 * See {@link DisplayFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export function isValidDisplayField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'scale': return isOrUndefined(isDisplayScale, value);
    case 'frame': return isOrUndefined(isDisplayFrame, value);
    case 'expanse': return isOrUndefined(isDisplayExpanse, value);
    default: return false;
  }
}

/**
 * Check if the `display` attribute is valid
 *
 * @param value - The `display` node to test
 * @returns Boolean
 */
export const isDisplayNode = (value?: {}): value is DisplayNode =>
  typeof value === 'object' && areFieldsValid(DisplayFields, value, isValidDisplayField);

/**
 * Create a `display` node (display attribute)
 *
 * @see {@link https://dita-lang.org/lwdita/commonspec/specification/langref/attributes/attribute-groups#attribute-groups__display-attributes}
 *
 * @remarks
 * eslint-disable-next-line `@typescript-eslint/no-explicit-any`
 *
 * @param constructor - The constructor
 * @returns The `display` node
 */
export function makeDisplay<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements DisplayNode {
    get 'scale'(): DisplayScale | undefined {
      return this.readProp<DisplayScale | undefined>('scale');
    }
    set 'scale'(value: DisplayScale | undefined) {
      this.writeProp<DisplayScale | undefined>('scale', value);
    }
    get 'frame'(): DisplayFrame | undefined {
      return this.readProp<DisplayFrame | undefined>('frame');
    }
    set 'frame'(value: DisplayFrame | undefined) {
      this.writeProp<DisplayFrame | undefined>('frame', value);
    }
    get 'expanse'(): DisplayExpanse | undefined {
      return this.readProp<DisplayExpanse | undefined>('expanse');
    }
    set 'expanse'(value: DisplayExpanse | undefined) {
      this.writeProp<DisplayExpanse | undefined>('expanse', value);
    }
  }
}