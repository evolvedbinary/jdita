import { isOrUndefined, areFieldsValid } from "../utils";
import { BaseNode } from "./base";
import { BasicValue, isNMTOKEN, NMTOKEN } from "../classes";

export const SizeFields = ['width', 'height'];
export interface SizeNode {
  'width'?: NMTOKEN;
  'height'?: NMTOKEN;
}

export function isValidSizeField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'width': return isOrUndefined(isNMTOKEN, value);
    case 'height': return isOrUndefined(isNMTOKEN, value);
    default: return false;
  }
}

export const isSizeNode = (value?: {}): value is SizeNode =>
  typeof value === 'object' && areFieldsValid(SizeFields, value, isValidSizeField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeSize<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements SizeNode {
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
