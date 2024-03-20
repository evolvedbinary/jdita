import { expect } from 'chai';
import { Visitor, XMLTag } from './visitor';
import { DocumentNode, TextNode, TitleNode, TopicNode } from "@jdita/lwdita-ast"

describe('XMLTag', () => {
  it('should print selfclosing tags correctly', () => {
    const tag = new XMLTag('title', {}, 0, true, true, false);
    expect(tag.toString()).equal('<title/>');
  });

  it('should print start tags correctly', () => {
    const tag = new XMLTag('title', {}, 0, false, true, false);
    expect(tag.toString()).equal('<title>');
  });

  it('should print end tags correctly', () => {
    const tag = new XMLTag('title', {}, 0, false, false, false);
    expect(tag.toString()).equal('</title>');
  });

  it('should print tags with attributes correctly', () => {
    const tag = new XMLTag('title', {dir: 'ltr', class: 'title', outputclass: 'title', translate: 'no', 'xml:lang': 'en'}, 0, true, true, false);
    expect(tag.toString()).equal('<title dir="ltr" class="title" outputclass="title" translate="no" xml:lang="en"/>');
  });

  it('should print tags with attributes and indentation correctly', () => {
    const tag = new XMLTag('title', {dir: 'ltr', class: 'title', outputclass: 'title', translate: 'no', 'xml:lang': 'en'}, 1, true, true, true);
    expect(tag.toString()).equal('  <title dir="ltr" class="title" outputclass="title" translate="no" xml:lang="en"/>\n');
  });

});

describe('Visitor', () => {
  let visitor: Visitor;
  let outStream: XMLTag[];

  beforeEach(() => {
    outStream = [];
    visitor = new Visitor(outStream);
  });

  it('should visit XMLNodes correctly', () => {
    // test setup
    //create a document node 
    const document = new DocumentNode();
    //create a topic node
    const topic = new TopicNode();
    document.add(topic);
    //create a title node
    const title = new TitleNode();
    // add title to the topic node
    topic.add(title);

    // visit the document node
    document.accept(visitor, 0 ,false);

    // expect the outStream to contain the correct XMLTags
    expect(outStream).deep.equal([
      new XMLTag('topic', {}, 0, false, true, false),
      new XMLTag('title', {}, 1, true, true, false),
      new XMLTag('topic', {}, 0, false, false, false)
    ]);
    
  });

  it('should visit XMLNodes with text node', () => {
    // test setup
    //create a document node 
    const document = new DocumentNode();
    //create a topic node
    const topic = new TopicNode();
    document.add(topic);
    //create a title node
    const title = new TitleNode();
    // add title to the topic node
    topic.add(title);
    //create a text node
    const text = new TextNode('Hello World');
    //add text to the title node
    title.add(text);
    // visit the document node
    document.accept(visitor, 0 ,false);

    // expect the outStream to contain the correct XMLTags
    expect(outStream).deep.equal([
      new XMLTag('topic', {}, 0, false, true, false),
      new XMLTag('title', {}, 1, false, true, false),
      'Hello World',
      new XMLTag('title', {}, 1, false, false, false),
      new XMLTag('topic', {}, 0, false, false, false)
    ]);
    
  });

  it('should visit XMLNodes with attributes', () => {
    // test setup
    //create a document node 
    const document = new DocumentNode();
    //create a topic node
    const topic = new TopicNode();
    document.add(topic);
    //create a title node with attributes
    const title = new TitleNode({dir: 'ltr', class: 'title', outputclass: 'title', translate: 'no', 'xml:lang': 'en'});
    // add title to the topic node
    topic.add(title);

    // visit the document node
    document.accept(visitor, 0 ,false);

    // expect the outStream to contain the correct XMLTags
    expect(outStream).deep.equal([
      new XMLTag('topic', {}, 0, false, true, false),
      new XMLTag('title', {dir: 'ltr', class: 'title', outputclass: 'title', translate: 'no', 'xml:lang': 'en'}, 1, true, true, false),
      new XMLTag('topic', {}, 0, false, false, false)
    ]);
    
  });

  it('should visit XMLNodes and produce xml output', () => {
    // test setup
    //create a document node 
    const document = new DocumentNode();
    //create a topic node
    const topic = new TopicNode();
    document.add(topic);
    //create a title node with attributes
    const title = new TitleNode();
    // add title to the topic node
    topic.add(title);

    // visit the document node
    document.accept(visitor, 0 ,false);

    // expect the outStream to contain the correct XMLTags
    expect(outStream.join("")).equal("<topic><title/></topic>");
    
  });


  it('should visit XMLNodes and produce xml output with indentation', () => {
    // test setup
    //create a document node 
    const document = new DocumentNode();
    //create a topic node
    const topic = new TopicNode();
    document.add(topic);
    //create a title node with attributes
    const title = new TitleNode();
    // add title to the topic node
    topic.add(title);

    // visit the document node
    document.accept(visitor, 0 ,true);

    // expect the outStream to contain the correct XMLTags
    expect(outStream.join("")).equal("<topic>\n  <title/>\n</topic>\n");
    
  });

});