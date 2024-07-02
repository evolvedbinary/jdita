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

import { doNodeTest } from "./tests";
import { TopicrefNode, isTopicrefNode } from "../src/nodes/topicref";
import { expect } from "chai";

doNodeTest(TopicrefNode, 'topicref', isTopicrefNode,
  [`dir`, `xml:lang`, `translate`, `props`, `class`, `outputclass`, `id`, `conref`, `href`, `format`, `scope`, `keyref`, `keys`],
  ['topicmeta?', 'topicref?']);

describe('Class KeydefNode', () => {
  it("sets correct attributes", () => {
    const topicref = new TopicrefNode({});

    topicref.dir = "dir";
    topicref["xml:lang"] = "lang";
    topicref.translate = "translate";
    topicref.props = "props";
    topicref.class = "class";
    topicref.outputclass = "outputclass";
    topicref.id = "id";
    topicref.conref = "conref";
    topicref.href = "href";
    topicref.format = "format";
    topicref.scope = "local";
    topicref.keyref = "keyref";
    topicref.keys = "keys";

    expect(topicref.dir).to.equal("dir");
    expect(topicref["xml:lang"]).to.equal("lang");
    expect(topicref.translate).to.equal("translate");
    expect(topicref.props).to.equal("props");
    expect(topicref.class).to.equal("class");
    expect(topicref.outputclass).to.equal("outputclass");
    expect(topicref.id).to.equal("id");
    expect(topicref.conref).to.equal("conref");
    expect(topicref.href).to.equal("href");
    expect(topicref.format).to.equal("format");
    expect(topicref.scope).to.equal("local");
    expect(topicref.keyref).to.equal("keyref");
    expect(topicref.keys).to.equal("keys");
  });
});