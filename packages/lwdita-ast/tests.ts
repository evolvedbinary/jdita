import { assert, expect } from 'chai';
import { BaseNode, Constructor, TextNode, DocumentNode } from './nodes';
import { stringToChildTypes } from '@jdita/lwdita-xml/utils';
import { OrArray } from '@jdita/lwdita-xml/classes';
import { NonAcceptedChildError, UnknownAttributeError, WrongAttributeTypeError } from "./ast-classes";

// TODO: add a test for checking invalid node

export function doNodeTest(
  classType: typeof BaseNode,
  nodeName: string,
  validator: (value?: {}) => boolean,
  fields: string[],
  children: OrArray<string> = [],
  attribute = 'dir',
  value = 'test',
  wrongValue = false,
): void {
  describe('Node: ' + nodeName, () => {
    it('should have correct fields', () => {
      assert.sameMembers(classType.fields, fields);
    });
    it('should have correct node name', () => {
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