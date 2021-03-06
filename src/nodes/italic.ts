import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode } from "./filters";
import { areFieldsValid } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { BasicValue } from "../classes";

// TODO:  "+ topic/ph hi-d/i "
export const ItalicFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

export interface ItalicNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

export const isValidItalicField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

export const isItalicNode = (value?: {}): value is ItalicNode =>
  typeof value === 'object' && areFieldsValid(ItalicFields, value, isValidItalicField);

export function makeItalic<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

@makeComponent(makeItalic, 'i', isValidItalicField, ItalicFields, ['%all-inline*'])
export class ItalicNode extends BaseNode {
  static domNodeName = 'i';
}
