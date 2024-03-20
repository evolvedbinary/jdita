import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "@jdita/lwdita-xml/utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "@jdita/lwdita-xml/classes";

/**
 * Define all allowed `title` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`
 */
export const TitleFields = [...LocalizationFields, ...ClassFields];

/**
 * Interface TitleNode defines the attribute types for `title`:
 * `CDATA`
 */
export interface TitleNode extends LocalizationNode, ClassNode {}

/**
 * Check if the given attributes of the `title` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidTitleField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `title` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `title` node to test
 * @returns Boolean
 */
export const isTitleNode = (value?: {}): value is TitleNode =>
  typeof value === 'object' && areFieldsValid(TitleFields, value, isValidTitleField);

/**
 * Construct a `title` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `title` node
 */
export function makeTitle<T extends Constructor>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeClass);
}

/**
 * Create a `title` node and map the `title` node with the LwDita tag name `h1`
 *
 * @decorator `@makeComponent`
 * @param makeTitle - The `title` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidTitleField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link TitleFields}
 * @param childNodes - An Array of allowed child nodes: `%common-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `data`)
 */
@makeComponent(makeTitle, 'title', isValidTitleField, TitleFields, ['%common-inline*'])
export class TitleNode extends BaseNode {
  static domNodeName = 'h1';
}