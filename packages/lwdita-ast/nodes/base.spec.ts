import { expect, assert } from 'chai';
import { BaseNode } from './base';
import { stringToChildTypes } from "@jdita/lwdita-xml";
import { NonAcceptedChildError } from '../ast-classes';

// TODO: add tests for an unknown node

describe('Base Node children (nodes)', () => {
  class ChildNode extends BaseNode {
    static nodeName = 'child';
  }
  class Child2Node extends BaseNode {
    static nodeName = 'child2';
  }

  // TODO: add tests for not throwing an exception on wrong children

  describe('Cardinality', () => {
    it('[0..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['child?']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[1..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should accept more than one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['child*']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..n] should accept more than one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['child+']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
  });
  // TODO: add order tests for groups
  // TODO: add going back in order tests for nodes
  // TODO: add going back in order tests for groups
  describe('Order', () => {
    it('[0..1] should skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first?', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..1] should not skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first*', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..n] should not skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first+', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
  });
  describe('Any order', () => {
    it('[0..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(child|child2)?']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[1..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['child|child2']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should accept many children', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(child|child2)+']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new ChildNode());
      }).to.not.throw();
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
        parentNode.add(new Child2Node());
      }).to.not.throw();
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new Child2Node());
      }).to.not.throw();
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..n] should accept many children', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(child|child2)*']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new ChildNode());
      }).to.not.throw();
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
        parentNode.add(new Child2Node());
      }).to.not.throw();
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new Child2Node());
      }).to.not.throw();
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
  });
});

describe('Base Node children (groups)', () => {
  class ChildInlineNode extends BaseNode {
    static nodeName = 'text';
  }
  class ChildBlockNode extends BaseNode {
    static nodeName = 'video';
  }
  describe('Cardinality', () => {
    it('[0..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline?']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[1..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should accept more than one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline*']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
    it('[1..n] should accept more than one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline+']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
  });
  describe('Order', () => {
    it('[0..1] should skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first?', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
    it('[1..1] should not skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first*', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
    it('[1..n] should not skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first+', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
  });
  describe('Any order', () => {
    it('[0..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(%all-inline|%all-blocks)?']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[1..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline|%all-blocks']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should accept many children', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(%all-inline|%all-blocks)+']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
    it('[1..n] should accept many children', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(%all-inline|%all-blocks)*']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
  });
});

describe('JDita', () => {
  it('Empty node', () => {
    class Node extends BaseNode {
      static nodeName = 'node';
    }
    const node = new Node();
    assert.deepEqual(node.json, {
        nodeName: 'node',
        attributes: undefined,
        children: undefined,
    });
  });
  it('Empty node with attributes', () => {
    class Node extends BaseNode {
      static nodeName = 'node';
      static fields = ['field1', 'field2'];
    }
    const node = new Node({});
    assert.deepEqual(node.json, {
        nodeName: 'node',
        attributes: {
          field1: undefined,
          field2: undefined,
        },
        children: undefined,
    });
  });
  it('Empty node with attributesand values', () => {
    class Node extends BaseNode {
      static nodeName = 'node';
      static fields = ['field1', 'field2'];
    }
    const node = new Node({
      field1: 'value1',
      field2: 'value2',
    });
    assert.deepEqual(node.json, {
        nodeName: 'node',
        attributes: {
          field1: 'value1',
          field2: 'value2',
        },
        children: undefined,
    });
  });
  it('Empty node with a child node', () => {
    class ParentNode extends BaseNode {
      static nodeName = 'parent';
      static fields = ['parent-field1', 'parent-field2'];
      static childTypes = stringToChildTypes(['node*']);
    }
    class Node extends BaseNode {
      static nodeName = 'node';
      static fields = ['field1', 'field2'];
    }
    const parentNode = new ParentNode({
      'parent-field1': 'parent-value1',
      'parent-field2': 'parent-value2',
    });
    parentNode.add(new Node({
      field1: 'value1',
      field2: 'value2',
    }));
    assert.deepEqual(parentNode.json, {
      nodeName: 'parent',
      attributes: {
        'parent-field1': 'parent-value1',
        'parent-field2': 'parent-value2',
      },
      children: [{
        nodeName: 'node',
        attributes: {
          field1: 'value1',
          field2: 'value2',
        },
        children: undefined,
      }],
    });
  });
  it('Empty node with children of children', () => {
    class ParentNode extends BaseNode {
      static nodeName = 'parent';
      static fields = ['parent-field1', 'parent-field2'];
      static childTypes = stringToChildTypes(['node*']);
    }
    class Node extends BaseNode {
      static nodeName = 'node';
      static fields = ['field1', 'field2'];
      static childTypes = stringToChildTypes(['node*']);
    }
    const parentNode = new ParentNode({
      'parent-field1': 'parent-value1',
      'parent-field2': 'parent-value2',
    });
    const node = new Node({
      field1: 'value1',
      field2: 'value2',
    });
    parentNode.add(node);
    node.add(new Node({
      field1: 'sub value1',
      field2: 'sub value2',
    }));
    node.add(new Node({
      field1: 'sub value3',
      field2: 'sub value4',
    }));
    assert.deepEqual(parentNode.json, {
      nodeName: 'parent',
      attributes: {
        'parent-field1': 'parent-value1',
        'parent-field2': 'parent-value2',
      },
      children: [{
        nodeName: 'node',
        attributes: {
          field1: 'value1',
          field2: 'value2',
        },
        children: [{
          nodeName: 'node',
          attributes: {
            field1: 'sub value1',
            field2: 'sub value2',
          },
          children: undefined,
        }, {
          nodeName: 'node',
          attributes: {
            field1: 'sub value3',
            field2: 'sub value4',
          },
          children: undefined,
        }],
      }],
    });
  });
});