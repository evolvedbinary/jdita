/*!
Copyright (C) 2020 Evolved Binary

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "../utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { ReferenceContentFields, ReferenceContentNodeAttributes, isValidReferenceContentField, makeReferenceContent } from "./reference-content";
import { VariableContentFields, VariableContentNodeAttributes, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { BasicValue } from "../classes";
import { CDATA, ReferenceContentScope } from "../ast-classes";

/**
 * Define all allowed `xref` (Reference) attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `href`, `format`, `scope`, `keyref`,`outputclass`, `class`
 */
export const XRefFields = [...FiltersFields, ...LocalizationFields, ...ReferenceContentFields, ...VariableContentFields, ...ClassFields ];

/**
 * Interface XRefNodeAttributes defines the attribute types for `xref`:
 * `CDATA`, `local` | `peer` | `external`
 */
export interface XRefNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReferenceContentNodeAttributes, VariableContentNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `xref` node are valid
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidXRefField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value)
  || isValidReferenceContentField(field, value)
  || isValidVariableContentField(field, value);

/**
 * Check if the `xref` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `xref` node to test
 * @returns Boolean
 */
export const isXRefNode = (value?: unknown): value is XRefNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(XRefFields, value as Record<string, BasicValue>, isValidXRefField);

/**
 * Construct an `xref` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `xref` node
 */
export function makeXRef<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeClass, makeReferenceContent, makeVariableContent);
}

/**
 * Create an xref node (cross reference) and map the `xref` node with the LwDita tag name `a`
 *
 * @decorator `@makeComponent`
 * @param makeXRef - The `xref` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidXRefField - A boolean value, if the attributes is valid or not
 * @param fields - A List of valid attributes @see {@link XRefFields}
 * @param childNodes - An Array of allowed child node `%inline.noxref*`: `text`, `ph`, `image`
 */
@makeComponent(makeXRef, 'xref', isValidXRefField, XRefFields, ['%inline.noxref*'])
export class XRefNode extends AbstractBaseNode implements XRefNodeAttributes {
  static domNodeName = 'a';

 // ClassNodeAttributes
 'outputclass'?: CDATA
 'class'?: CDATA

 // VariableContentNodeAttributes
 'keyref'?: CDATA

 // ReferenceContentNodeAttributes
 'href'?: CDATA
 'format'?: CDATA
 'scope'?: ReferenceContentScope

 // LocalizationNodeAttributes
 'dir'?: CDATA
 'xml:lang'?: CDATA
 'translate'?: CDATA

 // FiltersNodeAttributes
 'props'?: CDATA
}