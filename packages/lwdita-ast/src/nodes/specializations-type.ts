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
import { CDATA, isINCLUDED_DOMAINS } from "../ast-classes";

/**
 * Define all allowed `specializations` attributes:
 * The only allowed field is `specializations`
 */
export const SpecializationsFields = ['specializations'];

/**
 * The interface `SpecializationsNode` defines the attribute type for `specializations`: 'CDATA'
 */
export interface SpecializationsNodeAttributes {
  'specializations'?: CDATA;
}

/**
 * Check if the attributes `specializations` of the `Specializations` node is valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export function isValidSpecializationsField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'specializations': return isOrUndefined(isINCLUDED_DOMAINS, value);
    default: return false;
  }
}

/**
 * Check if the `specializations` node is valid
 *
 * @remarks
 * Assert that the node is an object and has a valid attribute
 *
 * @param value - The `specializations` node to test
 * @returns Boolean
 */
export const isSpecializationsNode = (value?: unknown): value is SpecializationsNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(SpecializationsFields, value as Record<string, BasicValue>, isValidSpecializationsField);

/**
 * Create a `Specializations` node with a `specializations` attribute
 *
 * @param constructor - The constructor
 * @returns The `variable-content` node with a `specializations` attribute and its value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeSpecializations<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return class extends constructor implements SpecializationsNodeAttributes {
    get 'specializations'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('specializations');
    }
    set 'specializations'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('specializations', value);
    }
  }
}