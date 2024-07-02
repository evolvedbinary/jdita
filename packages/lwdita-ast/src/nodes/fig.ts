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

import { DisplayNodeAttributes, DisplayFields, isValidDisplayField, makeDisplay } from "./display";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "../utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { FiltersFields, FiltersNodeAttributes, isValidFiltersField, makeFilters } from "./filters";
import { BasicValue } from "../classes";
import { CDATA, DisplayExpanse, DisplayFrame, DisplayScale, NMTOKEN, } from "../ast-classes";
import { isValidReuseField, makeReuse, ReuseFields, ReuseNodeAttributes } from "./reuse";

/**
 * Define all allowed `fig` attributes:
 * `scale`, `frame`, `expanse`, `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const FigFields = [...DisplayFields, ...LocalizationFields, ...FiltersFields, ...ReuseFields, ...ClassFields];

/**
 * Interface FigNode defines the attribute types for `fig`
 */
export interface FigNodeAttributes extends
  DisplayNodeAttributes,
  FiltersNodeAttributes,
  ReuseNodeAttributes,
  LocalizationNodeAttributes,
  ClassNodeAttributes,
  BaseNode { }

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
  || isValidReuseField (field, value)
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
export const isFigNode = (value?: unknown): value is FigNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(FigFields, value as Record<string, BasicValue>, isValidFigField);

/**
 * Construct a `fig` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `fig` node
 */
export function makeFig<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeDisplay, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `fig` node
 *
 * @decorator `@makeComponent`
 * @param makeFig - The `fig` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidFigField - A boolean value, if the attribute is valid or not
 * @param FigFields - An array containing all valid attribute names, @see {@link FigFields}
 * @param childNodes - An array containing all valid child node names: `title?`, `desc?` and  [`p`, `ul`, `ol`, `dl`, `pre`, `audio`, `video`, `example`, `simpletable`, or `image*`, or `xref*`]
 * @returns A `fig` node
 */
@makeComponent(makeFig, 'fig', isValidFigField, FigFields, ['title?', 'desc?', ['%fig-blocks*', 'image*', 'xref*']])
export class FigNode extends AbstractBaseNode implements FigNodeAttributes {
  static domNodeName = 'figure';

  // DisplayNodeAttributes
  'scale'?: DisplayScale;
  'frame'?: DisplayFrame;
  'expanse'?: DisplayExpanse;

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA

  // ReuseNodeAttributes
  'id'?: NMTOKEN;
  'conref'?: CDATA;

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA
}