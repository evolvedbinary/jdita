import { SaxesAttributeNS } from "saxes";

/**
 * JDita is a JSON representation of a DITA XML document
 */
export interface JDita {
  nodeName: string;
  attributes?: Record<string, BasicValue>;
  content?: string;
  children?: JDita[];
}

/**
 * TypeDef for attributes Record BasicValue
 */
export type DefinedBasicValue = number | boolean | string | Array<BasicValue> | {} | {
  [key: string]: BasicValue;
  [key: number]: BasicValue;
};

/**
 * TypeDef for Attributes Record 
 */
export type Attributes = Record<string, SaxesAttributeNS> | Record<string, string>;

/**
 * Base type for all XML nodes
 */
export interface XMLNode<T extends string = string> {
    name: T;
    attributes: Attributes;
}

/**
 * @typeParam T - Generic type or Array of generic type
 */
export type OrArray<T> = T | (T | OrArray<T>)[];

/**
 * BasicValue is a value that can be used in XML attributes or content
 */
export type BasicValue = undefined | DefinedBasicValue;

/**
 * ChildType Object
 * 
 * name - Child name
 * 
 * required - Defines if the child is required or not
 * 
 * single - Does not belong to a group like `section`
 * 
 * isGroup - Belong to a group like `all-line`
 */
export interface ChildType {
    name: string;
    required: boolean;
    single: boolean;
    isGroup: boolean;
}

/**
 * Array for @see {@link ChildType}
 */
export type ChildTypes = OrArray<ChildType>;