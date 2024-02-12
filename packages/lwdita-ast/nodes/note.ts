import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, isOrUndefined } from "@jdita/lwdita-xml/utils";
import { makeComponent, BaseNode, makeAll } from "./base";
import { BasicValue } from "@jdita/lwdita-xml/classes";
import { CDATA, isCDATA } from "../ast-classes";

/**
 * Define all allowed `note` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`, `type`
 */
export const NoteFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields, 'type'];

/**
 * Interface NoteNode defines the attribute type for `note`: `CDATA`
 */
export interface NoteNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {
  type: CDATA;
}

/**
 * Check if the given attributes of the `note` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export function isValidNoteField(field: string, value: BasicValue): boolean {
  if (isValidFiltersField(field, value)
    || isValidLocalizationField(field, value)
    || isValidReuseField(field, value)
    || isValidClassField(field, value)) {
    return true;
  }
  switch (field) {
    case 'type': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `note` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `note` node to test
 * @returns Boolean
 */
export const isNoteNode = (value?: {}): value is NoteNode =>
  typeof value === 'object' && areFieldsValid(NoteFields, value, isValidNoteField);

/**
 * Construct a `note` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `note` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeNote<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return makeAll(class extends constructor {
    get 'type'(): CDATA {
      return this.readProp<CDATA>('type');
    }
    set 'type'(value: CDATA) {
      this.writeProp<CDATA>('type', value);
    }
  }, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `note` node and map the `note` node with the LwDita tag name `div`
 *
 * @decorator `@makeComponent`
 * @param makeNote - The `note` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidNoteField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link NoteFields}
 * @param childNodes - An Array of allowed child nodes: `%simple-blocks*` (`p`, `ul`, `ol`, `dl`, `pre`, `audio`, `video`, `simpletable`, `fig`, `note`, `data`)
 */
@makeComponent(makeNote, 'note', isValidNoteField, NoteFields, ['%simple-blocks*'])
export class NoteNode extends BaseNode {
  static domNodeName = 'div';
}