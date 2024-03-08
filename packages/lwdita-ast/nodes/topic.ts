import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { isOrUndefined, areFieldsValid } from "@jdita/lwdita-xdita/utils";
import { BaseNode, makeComponent, makeAll } from "./base";
import { BasicValue } from "@jdita/lwdita-xdita/classes";
import { CDATA, isCDATA, ID } from "../ast-classes";

/**
 * Define all allowed `topic` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`, `id`, `xmlns:ditaarch`, `ditaarch:DITAArchVersion`, `domains`
 */
export const TopicFields = [...LocalizationFields, ...ClassFields, 'id', 'xmlns:ditaarch', 'ditaarch:DITAArchVersion', 'domains'];

/**
 * Interface TopicNode defines the attribute types for `topic`:
 * `CDATA`, `ID`
 *
 * @privateRemarks
 * TODO: Implement type "&xdita-constraint; &included-domains;"
 */
export interface TopicNode extends LocalizationNode, ClassNode {
  'id': ID;
  'xmlns:ditaarch': CDATA;
  'ditaarch:DITAArchVersion'?: CDATA;
  'domains'?: CDATA;
}

/**
 * Check if the given attributes of the `topic` node are valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export function isValidTopicField(field: string, value: BasicValue): boolean {
  if (isValidLocalizationField(field, value) || isValidClassField(field, value)) {
    return true;
  }
  switch(field) {
    case 'id': return isOrUndefined(isCDATA, value);
    case 'xmlns:ditaarch': return isOrUndefined(isCDATA, value);
    case 'domains': return isOrUndefined(isCDATA, value);
    case 'ditaarch:DITAArchVersion': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `topic` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `topic` node to test
 * @returns Boolean
 */
export const isTopicNode = (value?: {}): value is TopicNode =>
  typeof value === 'object' && areFieldsValid(TopicFields, value, isValidTopicField);

/**
 * Construct a `topic` node with all available attributes
 *
 * @privateRemarks
 * eslint-disable-next-line `@typescript-eslint/no-explicit-any`
 *
 * @param constructor - The constructor
 * @returns A `topic` node
 */
export function makeTopic<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(class extends constructor {
    get 'id'(): ID {
      return this.readProp<ID>('id'); }
    set 'id'(value: ID) {
        this.writeProp<ID>('id', value); }
    get 'xmlns:ditaarch'(): CDATA {
      return this.readProp<CDATA>('xmlns:ditaarch'); }
    set 'xmlns:ditaarch'(value: CDATA) {
        this.writeProp<CDATA>('xmlns:ditaarch', value); }
    get 'ditaarch:DITAArchVersion'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('ditaarch:DITAArchVersion'); }
    set 'ditaarch:DITAArchVersion'(value: CDATA | undefined) {
        this.writeProp<CDATA | undefined>('ditaarch:DITAArchVersion', value); }
    get 'domains'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('domains'); }
    set 'domains'(value: CDATA | undefined) {
        this.writeProp<CDATA | undefined>('domains', value); }
  }, makeLocalization, makeClass,);
}

/**
 * Create a `topic` node (article) and map the `topic` node with the LwDita tag name `article`
 *
 * @decorator `@makeComponent`
 * @param makeTopic - The `topic` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidTopicField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes, @see {@link TopicFields}
 * @param childNodes - An Array of allowed child nodes: `title`, `shortdesc?`, `prolog?`, `body?`
 */
@makeComponent(makeTopic, 'topic', isValidTopicField, TopicFields, ['title', 'shortdesc?', 'prolog?', 'body?'])
export class TopicNode extends BaseNode {
  static domNodeName = 'article';
}