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

import { assert, expect } from 'chai';
import { AbstractBaseNode, Constructor, TextNode, DocumentNode } from '../src/nodes';
import { stringToChildTypes } from '../src/utils';
import { OrArray } from '../src/classes';
import { NonAcceptedChildError, UnknownAttributeError, WrongAttributeTypeError } from "../src/ast-classes";

// TODO: add a test for checking invalid node

export function doNodeTest(
  classType: typeof AbstractBaseNode,
  nodeName: string,
  validator: (value?: unknown) => boolean,
  fields: string[],
  children: OrArray<string> = [],
  attribute = 'dir',
  value = 'test',
  wrongValue = false,
): void {
  describe('Node: ' + nodeName, () => {
    it('should have correct fields: ' + fields, () => {
      assert.sameMembers(classType.fields, fields);
    });
    it('should have correct node name: ' + nodeName, () => {
      assert.equal(classType.nodeName, nodeName);
    });
    it('should be a correct node', () => {
      const node = new (classType as unknown as Constructor)({});
      expect(validator(node)).to.be.true;
    });
    it('should be accept correct children', () => {
      assert.deepEqual(stringToChildTypes(children), classType.childTypes);
    });
    it('should be able to set properties', () => {
      const node = new (classType as unknown as Constructor)({});
      expect(() => node.writeProp(attribute, value)).to.not.throw();
    });
    it('should fail setting wrong attribute value', () => {
      const node = new (classType as unknown as Constructor)({});
      expect(() => node.writeProp(attribute, wrongValue)).to.throw(WrongAttributeTypeError, 'wrong attribute type');
    });
    it('should fail setting a wrong attribute', () => {
      const node = new (classType as unknown as Constructor)({});
      expect(() => node.writeProp('attribute', 'value')).to.throw(UnknownAttributeError, 'unknown attribute');
    });
    it('should fail reading a wrong attribute', () => {
      const node = new (classType as unknown as Constructor)({});
      expect(() => node.readProp('attribute')).to.throw(UnknownAttributeError, 'unknown attribute');
    });
    it('should fail creating under wrong parent', () => {
      const parentNode = new TextNode('');
      const node = new (classType as unknown as Constructor)({});
      expect(() => parentNode.add(node)).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('should fail having wrong child', () => {
      const node = new (classType as unknown as Constructor)({});
      const childNode = new DocumentNode();
      expect(() => node.add(childNode)).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });

    it('can create node with valid attributes', () => {
      const node = new (classType as unknown as Constructor)({ [attribute]: value });
      expect(node.readProp(attribute)).to.equal(value);
    });

    //TODO: when created a node with invalid attributes, it should throw an error
    // Typescript type checking doesn't allow to create a node with invalid attributes
    it.skip("can't create node with invalid attributes", () => {
      expect(() => new (classType as unknown as Constructor)({ [attribute]: wrongValue as unknown as string })).to.throw(WrongAttributeTypeError, 'wrong attribute type');
    });
  });
}