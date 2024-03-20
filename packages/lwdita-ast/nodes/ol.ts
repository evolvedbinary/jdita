import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@jdita/lwdita-xml/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "@jdita/lwdita-xml/classes";

/**
 * Define all allowed `ol` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const OlFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface olNode defines the attribute type for `ol`:
 * `CDATA`, `NMTOKEN`
 */
export interface OlNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given attributes of the `ol` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidOlField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `ol` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `ol` node to test
 * @returns Boolean
 */
export const isOlNode = (value?: {}): value is OlNode =>
  typeof value === 'object' && areFieldsValid(OlFields, value, isValidOlField);

/**
 * Construct an `ol` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `ol` node
 */
export function makeOl<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create an `ol` (ordered list) node and map the `ol` node with the LwDita tag name `ol`
 *
 * @decorator `@makeComponent`
 * @param makeOl - The `ol` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidOlField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link OlFields}
 * @param childNodes - An Array of allowed child nodes: `li+`
 */
@makeComponent(makeOl, 'ol', isValidOlField, OlFields, ['li+'])
export class OlNode extends BaseNode {
  static domNodeName = 'ol';
}