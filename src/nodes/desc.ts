import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";

export const DescFields = [...FiltersFields, ...LocalizationFields, ...ClassFields];

export interface DescNode extends FiltersNode, LocalizationNode, ClassNode { }

export const isValidDescField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

export const isDescNode = (value?: {}): value is DescNode =>
  typeof value === 'object' && areFieldsValid(DescFields, value, isValidDescField);

export function makeDesc<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeClass);
}

@makeComponent(makeDesc, 'desc', isValidDescField, DescFields, ['%common-inline*'])
export class DescNode extends BaseNode {
  // TODO: caption/figcaption
  static domNodeName = 'caption';
}
