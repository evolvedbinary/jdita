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
import { CDATA, isReferenceContentScope, ReferenceContentScope, isCDATA } from "../ast-classes";


export const ReferenceContentFields = ['href', 'format', 'scope'];
export interface ReferenceContentNodeAttributes {
  'href'?: CDATA;
  'format'?: CDATA;
  'scope'?: ReferenceContentScope;
}

export function isValidReferenceContentField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'href': return isOrUndefined(isCDATA, value);
    case 'format': return isOrUndefined(isCDATA, value);
    case 'scope': return isOrUndefined(isReferenceContentScope, value);
    default: return false;
  }
}

export const isReferenceContentNode = (value?: unknown): value is ReferenceContentNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(ReferenceContentFields, value as Record<string, BasicValue>, isValidReferenceContentField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeReferenceContent<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return class extends constructor implements ReferenceContentNodeAttributes {
    get 'href'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('href');
    }
    set 'href'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('href', value);
    }
    get 'format'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('format');
    }
    set 'format'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('format', value);
    }
    get 'scope'(): ReferenceContentScope | undefined {
      return this.readProp<ReferenceContentScope | undefined>('scope');
    }
    set 'scope'(value: ReferenceContentScope | undefined) {
      this.writeProp<ReferenceContentScope | undefined>('scope', value);
    }
  }
}
