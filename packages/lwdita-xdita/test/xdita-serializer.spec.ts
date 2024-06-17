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

import { expect } from 'chai';
import { XditaSerializer } from '../src/xdita-serializer';
import { InMemoryTextSimpleOutputStreamCollector } from '../src/stream';
import { CDataNode, DocumentNode, TextNode, TitleNode, TopicNode } from "@evolvedbinary/lwdita-ast"

describe('XditaSerializer', () => {
  let outStream: InMemoryTextSimpleOutputStreamCollector;
  let serializer: XditaSerializer;

  beforeEach(() => {
    outStream = new InMemoryTextSimpleOutputStreamCollector();
    serializer = new XditaSerializer(outStream);
  });

  it('skip the document node', () => {
    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    topic.add(title);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML
    expect(outStream.getText()).equal("<topic><title/></topic>");
  });

  it('serialize a document with indentation', () => {
    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    topic.add(title);

    // configure serializer with indentation
    serializer = new XditaSerializer(outStream, true, ' ', 4);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with indentation
    expect(outStream.getText()).equal("<topic>\n    <title/>\n</topic>\n");
  });

  it('serialize a document with text content', () => {
    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    topic.add(title);
    const text = new TextNode('Hello World');
    title.add(text);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with text content
    expect(outStream.getText()).equal("<topic><title>Hello World</title></topic>");
  });

  it('serialize a document with attributes', () => {
    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode({ dir: 'ltr', class: 'title' });
    topic.add(title);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with attributes
    expect(outStream.getText()).equal('<topic><title dir="ltr" class="title"/></topic>');
  });

  it('serialize a document with cdata', () => {
    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    const cdata = new CDataNode('cdata');
    title.add(cdata);
    topic.add(title);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with attributes
    expect(outStream.getText()).equal('<topic><title><![CDATA[cdata]]></title></topic>');
  });
});