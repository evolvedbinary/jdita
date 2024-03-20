import { DisplayNode, DisplayFields, isValidDisplayField, makeDisplay } from "./display";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "@jdita/lwdita-xml/utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { FiltersFields, FiltersNode, isValidFiltersField, makeFilters } from "./filters";
import { BasicValue } from "@jdita/lwdita-xml/classes";

/**
 * Define all allowed `fig` attributes:
 * `scale`, `frame`, `expanse`, `props`, `dir`, `xml:lang`, `translate`, `outputclass`, `class`
 */
export const FigFields = [...DisplayFields, ...LocalizationFields, ...FiltersFields, ...ClassFields];

/**
 * Interface FigNode defines the attribute types for `fig`
 */
export interface FigNode extends DisplayNode, LocalizationNode, FiltersNode, ClassNode { }

/**
 * Check if the given attributes of the `fig` node are valid and match this list:
 * @See {@link FigFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidFigField = (field: string, value: BasicValue): boolean => isValidDisplayField(field, value)
  || isValidLocalizationField(field, value)
  || isValidFiltersField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `fig` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `fig` node to test
 * @returns Boolean
 */
export const isFigNode = (value?: {}): value is FigNode =>
  typeof value === 'object' && areFieldsValid(FigFields, value, isValidFigField);

/**
 * Construct a `fig` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `fig` node
 */
export function makeFig<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeDisplay, makeFilters, makeClass);
}

/**
 * Create a `fig` node
 *
 * @decorator `@makeComponent`
 * @param makeFig - The `fig` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidFigField - A boolean value, if the attribute is valid or not
 * @param FigFields - An array containing all valid attribute names, @see {@link FigFields}
 * @param childNodes - An array containing all valid child node names: `%common-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `data`)
 * @returns A `fig` node
 */
@makeComponent(makeFig, 'fig', isValidFigField, FigFields, ['title?', 'desc?', ['%fig-blocks*', 'image*', 'xref*']])
export class FigNode extends BaseNode {
  static domNodeName = 'figure';
}