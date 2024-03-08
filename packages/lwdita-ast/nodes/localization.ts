import { isOrUndefined, areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { BaseNode } from "./base";
import { BasicValue } from "@jdita/lwdita-xdita/classes";
import { CDATA, isCDATA } from "../ast-classes";


/**
 * `LocalizationFields`: `dir`, `xml:lang`, `translate`
 */
export const LocalizationFields = ['dir', 'xml:lang', 'translate'];

/**
 * Interface LocalizationNode defines the attribute types for localization attributes: `CDATA`
 */
export interface LocalizationNode {
  'dir'?: CDATA;
  'xml:lang'?: CDATA;
  'translate'?: CDATA;
}

/**
 * Check if the given attributes of the `localization` node are valid and match this list:
 * @See {@link LocalizationFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export function isValidLocalizationField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'dir': return isOrUndefined(isCDATA, value);
    case 'xml:lang': return isOrUndefined(isCDATA, value);
    case 'translate': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `localization` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `localization` node to test
 * @returns Boolean
 */
export const isLocalizationNode = (value?: {}): value is LocalizationNode =>
  typeof value === 'object' && areFieldsValid(LocalizationFields, value, isValidLocalizationField);

/**
 * Create a `localization` node with an `dir`, `xml:lang`, `translate` attribute
 *
 * @remarks
 * eslint-disable-next-line `@typescript-eslint/no-explicit-any`
 *
 * @param constructor - The constructor
 * @returns The `localization` node with an `dir`, `xml:lang`, `translate` attribute and their values
 */
export function makeLocalization<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements LocalizationNode {
    get 'dir'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('dir');
    }
    set 'dir'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('dir', value);
    }
    get 'xml:lang'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('xml:lang');
    }
    set 'xml:lang'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('xml:lang', value);
    }
    get 'translate'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('translate');
    }
    set 'translate'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('translate', value);
    }
  }
}