// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { expect, assert } from 'chai';
import { stringToChildTypes, splitTypenames, childTypesToString, customChildTypesToString } from './utils';
import { ChildTypes } from './classes';

// TODO: add a test for getting child types from: (X+|Y*|Z*)
// TODO: add a test for getting string from child type of group '%XYZ*' => (X|Y|Z)*
// TODO: add tests to check required/single for strings

const mockedNodeGroups = {
  'data': ['data'],
};

describe('Childtype from string', () => {
  it('should return an empty ChildType', () => {
    assert.deepEqual([], stringToChildTypes(''));
  });
  it('[0..1] should return the correct ChildType', () => {
    assert.deepEqual([{
      name: 'child',
      single: true,
      required: false,
      isGroup: false,
    }] as ChildTypes, stringToChildTypes('child?'));
  });
  it('[1..1] should return the correct ChildType', () => {
    assert.deepEqual([{
      name: 'child',
      single: true,
      required: true,
      isGroup: false,
    }] as ChildTypes, stringToChildTypes('child'));
  });
  it('[0..n] should return the correct ChildType', () => {
    assert.deepEqual([{
      name: 'child',
      single: false,
      required: false,
      isGroup: false,
    }] as ChildTypes, stringToChildTypes('child*'));
  });
  it('[1..n] should return the correct ChildType', () => {
    assert.deepEqual([{
      name: 'child',
      single: false,
      required: true,
      isGroup: false,
    }] as ChildTypes, stringToChildTypes('child+'));
  });
  it('[0..1] should return the correct ChildType (group)', () => {
    assert.deepEqual([{
      name: 'child',
      single: true,
      required: false,
      isGroup: true,
    }] as ChildTypes, stringToChildTypes('%child?'));
  });
  it('[1..1] should return the correct ChildType (group)', () => {
    assert.deepEqual([{
      name: 'child',
      single: true,
      required: true,
      isGroup: true,
    }] as ChildTypes, stringToChildTypes('%child'));
  });
  it('[0..n] should return the correct ChildType (group)', () => {
    assert.deepEqual([{
      name: 'child',
      single: false,
      required: false,
      isGroup: true,
    }] as ChildTypes, stringToChildTypes('%child*'));
  });
  it('[1..n] should return the correct ChildType (group)', () => {
    assert.deepEqual([{
      name: 'child',
      single: false,
      required: true,
      isGroup: true,
    }] as ChildTypes, stringToChildTypes('%child+'));
  });
});
describe('String from Childtype', () => {
  it('[0..1] should return the correct string', () => {
    assert.equal(childTypesToString({
      name: 'child',
      single: true,
      required: false,
      isGroup: false,
    },mockedNodeGroups), 'child?');
  });
  it('[1..1] should return the correct string', () => {
    assert.equal(childTypesToString({
      name: 'child',
      single: true,
      required: true,
      isGroup: false,
    },mockedNodeGroups), 'child');
  });
  it('[0..n] should return the correct string', () => {
    assert.equal(childTypesToString({
      name: 'child',
      single: false,
      required: false,
      isGroup: false,
    },mockedNodeGroups), 'child*');
  });
  it('[1..n] should return the correct string', () => {
    assert.equal(childTypesToString({
      name: 'child',
      single: false,
      required: true,
      isGroup: false,
    },mockedNodeGroups), 'child+');
  });
  it('[0..1] should return the correct string (group with one node)', () => {
    assert.equal(childTypesToString({
      name: 'data',
      single: true,
      required: false,
      isGroup: true,
    }, mockedNodeGroups), 'data?');
  });
  it('[1..1] should return the correct string (group with one node)', () => {
    assert.equal(childTypesToString({
      name: 'data',
      single: true,
      required: true,
      isGroup: true,
    }, mockedNodeGroups), 'data');
  });
  it('[0..n] should return the correct string (group with one node)', () => {
    assert.equal(childTypesToString({
      name: 'data',
      single: false,
      required: false,
      isGroup: true,
    }, mockedNodeGroups), 'data*');
  });
  it('[1..n] should return the correct string (group with one node)', () => {
    assert.equal(childTypesToString({
      name: 'data',
      single: false,
      required: true,
      isGroup: true,
    }, mockedNodeGroups), 'data+');
  });
  it('[0..1] should return the correct string (group with multiple nodes)', () => {
    assert.equal(childTypesToString(stringToChildTypes('(ph|b|i|u|sub|sup)?'), mockedNodeGroups), 'ph?|b?|i?|u?|sub?|sup?');
  });
  it('[1..1] should return the correct string (group with multiple nodes)', () => {
    assert.equal(childTypesToString(stringToChildTypes('ph|b|i|u|sub|sup'), mockedNodeGroups), 'ph|b|i|u|sub|sup');
  });
  it('[0..n] should return the correct string (group with multiple nodes)', () => {
    assert.equal(childTypesToString(stringToChildTypes('(ph|b|i|u|sub|sup)*'), mockedNodeGroups), 'ph*|b*|i*|u*|sub*|sup*');
  });
  it('[1..n] should return the correct string (group with multiple nodes)', () => {
    assert.equal(childTypesToString(stringToChildTypes('(ph|b|i|u|sub|sup)+'), mockedNodeGroups), 'ph+|b+|i+|u+|sub+|sup+');
  });
  it('should return the correct string (mixed)', () => {
    assert.equal(childTypesToString(stringToChildTypes(['(ph|b|i|u|sub|sup)?', 'child+', 'a*|b']), mockedNodeGroups), '(ph?|b?|i?|u?|sub?|sup?)|child+|(a*|b)');
  });
  it('should return the correct string (empty)', () => {
    assert.equal(childTypesToString(stringToChildTypes(''), mockedNodeGroups), '');
  });
});
// TODO: add other cardinalities tests
describe('Custom string from Childtype', () => {
  it('[0..1] should return the correct custom string', () => {
    assert.equal(customChildTypesToString([{
      name: 'child1',
      single: true,
      required: false,
      isGroup: false,
    }, {
      name: 'child2',
      single: true,
      required: false,
      isGroup: false,
    }], mockedNodeGroups, x => x === 'child1' ? 'text' : 'p'), 'text?|p?');
  });
});
describe('Childtypes from strings', () => {
  it('should split types names correctly', () => {
    assert.deepEqual(splitTypenames('child1?|child2+'), ['child1?', 'child2+']);
  });
  it('should split types names correctly (using parentheses)', () => {
    assert.deepEqual(splitTypenames('(child1|child2)+'), ['child1+', 'child2+']);
  });
  it('should return the correct ChildTypes', () => {
    assert.deepEqual(stringToChildTypes(['child1?', 'child2+']), [stringToChildTypes('child1?', false), stringToChildTypes('child2+', false)]);
  });
  it('should return the ChildTypes with any order', () => {
    assert.deepEqual(stringToChildTypes([['child1?', 'child2+']]), [[stringToChildTypes('child1?', false), stringToChildTypes('child2+', false)]]);
  });
  it('should return the ChildTypes with any order', () => {
    assert.deepEqual(stringToChildTypes(['child1?|child2+']), [[stringToChildTypes('child1?', false), stringToChildTypes('child2+', false)]]);
  });
});