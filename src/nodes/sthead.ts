import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";

export const StHeadFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

export interface StHeadNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

export const isValidStHeadField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

export const isStHeadNode = (value?: {}): value is StHeadNode =>
  typeof value === 'object' && areFieldsValid(StHeadFields, value, isValidStHeadField);

export function makeStHead<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeStHead, 'sthead', isValidStHeadField, StHeadFields, ['stentry+'])
export class StHeadNode extends BaseNode {
  static domNodeName = 'thead';
}
