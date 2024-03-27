
import { expect } from 'chai';
import { serializeToXML, xditaToJdita, xditaToJson } from '../converter';

describe('xditaToJdita', () => {
  it('converts XDITA XML to JDITA DocumentNode', async () => {
    const xml = `<topic id="topicID"><title>text content</title></topic>`;
    const jdita = await xditaToJdita(xml);

    const topicNode = jdita.children[0];

    const titleNode = topicNode.children[0];

    const textNode = titleNode.children[0];

    // Assert the structure of the converted JDITA DocumentNode
    expect(jdita).to.not.be.undefined;
    expect(jdita._children?.length).to.equal(1);
    // test the topic node
    expect(topicNode.static.nodeName).to.equal('topic');
    expect(topicNode.readProp('id')).to.equal('topicID');
    expect(topicNode.children.length).to.equal(1);
    // test the title node
    expect(titleNode.static.nodeName).to.equal('title');
    expect(titleNode.children.length).to.equal(1);
    // test the text node
    expect(textNode.static.nodeName).to.equal('text');
    expect(textNode.readProp("content")).to.equal('text content');

  });

  it('rejects with errors if XML parsing fails', async () => {
    const xml = `<invalid-xml`;

    expect(xditaToJdita(xml)).to.be.throw;
  });
});

describe('jditaToXdita', () => {
  it('converts XDITA DocumentNode to JDITA json', async () => {
    const xdita = `<topic id="topicID"><title>text content</title></topic>`;

    const xditaJson = await xditaToJson(xdita);
    const json = {
      "nodeName": "document",
      "attributes": undefined,
      "children": [
        {
          "nodeName": "topic",
          "attributes": {
            "dir": undefined,
            "xml:lang": undefined,
            "translate": undefined,
            "outputclass": undefined,
            "class": undefined,
            "id": "topicID",
            "xmlns:ditaarch": undefined,
            "ditaarch:DITAArchVersion": undefined,
            "domains": undefined
          },
          "children": [
            {
              "nodeName": "title",
              "attributes": {
                "dir": undefined,
                "xml:lang": undefined,
                "translate": undefined,
                "outputclass": undefined,
                "class": undefined
              },
              "children": [
                {
                  "nodeName": "text",
                  "content": "text content"
                }
              ]
            }
          ]
        }
      ]
    }

    // Assert the converted XDITA XML
    expect(xditaJson).to.deep.equal(json);
  });
});

describe('serializeToXML', () => {
  it('serializes the root node to XML', async () => {
    const xml = `<topic id="topicID"><title>text content</title></topic>`;
    const jdita = await xditaToJdita(xml);

    const indent = false;

    const result = serializeToXML(jdita, indent);

    // Assert the serialized XML output
    expect(result.join("")).to.equal(xml);
  });

  it('serializes the root node to XML with indentation', async () => {
    const xml = `<topic id="topicID"><title>text content</title></topic>`;
    const jdita = await xditaToJdita(xml);

    const indent = true;

    const result = serializeToXML(jdita, indent);

    const expected = `<topic id="topicID">\n  <title>\n    text content\n  </title>\n</topic>\n`;

    // Assert the serialized XML output
    expect(result.join("")).to.equal(expected);
  });
});