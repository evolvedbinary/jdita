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

import { areFieldsValid, isOrUndefined } from "../utils";
import { AbstractBaseNode } from "./base";
import { BasicValue } from "../classes";
import { DisplayExpanse, DisplayFrame, DisplayScale, isDisplayExpanse, isDisplayFrame, isDisplayScale } from "../ast-classes";


/**
 * DisplayFields (display attributes): `scale`, `frame`, `expanse`
 *
 * @remarks
 * entity `%display-atts` in LwDITA DTD, @see {@link https://github.com/oasis-tcs/dita-lwdita/blob/b2985f254746b2614c1b9d6a5e6043f82335506f/org.oasis.xdita/dtd/lw-topic.mod#L120}
 */
export const DisplayFields = ['scale', 'frame', 'expanse'];

/**
 * Interface DisplayNode defines the attribute types
 */
export interface DisplayNodeAttributes {
  'scale'?: DisplayScale;
  'frame'?: DisplayFrame;
  'expanse'?: DisplayExpanse;
}

/**
 * Check if the attributes `scale`, `frame`, `expanse` are valid
 *
 * See {@link DisplayFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export function isValidDisplayField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'scale': return isOrUndefined(isDisplayScale, value);
    case 'frame': return isOrUndefined(isDisplayFrame, value);
    case 'expanse': return isOrUndefined(isDisplayExpanse, value);
    default: return false;
  }
}

/**
 * Check if the `display` attribute is valid
 *
 * @param value - The `display` node to test
 * @returns Boolean
 */
export const isDisplayNode = (value?: unknown): value is DisplayNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(DisplayFields, value as Record<string, BasicValue>, isValidDisplayField);

/**
 * Create a `display` node (display attribute)
 *
 * @see {@link https://dita-lang.org/lwdita/commonspec/specification/langref/attributes/attribute-groups#attribute-groups__display-attributes}
 *
 * @param constructor - The constructor
 * @returns The `display` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeDisplay<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return class extends constructor implements DisplayNodeAttributes {
    get 'scale'(): DisplayScale | undefined {
      return this.readProp<DisplayScale | undefined>('scale');
    }
    set 'scale'(value: DisplayScale | undefined) {
      this.writeProp<DisplayScale | undefined>('scale', value);
    }
    get 'frame'(): DisplayFrame | undefined {
      return this.readProp<DisplayFrame | undefined>('frame');
    }
    set 'frame'(value: DisplayFrame | undefined) {
      this.writeProp<DisplayFrame | undefined>('frame', value);
    }
    get 'expanse'(): DisplayExpanse | undefined {
      return this.readProp<DisplayExpanse | undefined>('expanse');
    }
    set 'expanse'(value: DisplayExpanse | undefined) {
      this.writeProp<DisplayExpanse | undefined>('expanse', value);
    }
  }
}