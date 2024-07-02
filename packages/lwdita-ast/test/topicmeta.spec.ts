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
import { TopicmetaNode, isTopicmetaNode } from "../src/nodes/topicmeta";
import { expect } from "chai";

doNodeTest(TopicmetaNode, 'topicmeta', isTopicmetaNode,
  ['outputclass', 'class', 'dir', 'xml:lang', 'translate'],
  ['navtitle?', 'keytext?', 'othermeta*']);

describe('Class TopicmetaNode', () => {
  it("sets correct attributes", () => {
    const topicmeta = new TopicmetaNode({});

    topicmeta.dir = "dir";
    topicmeta["xml:lang"] = "lang";
    topicmeta.translate = "translate";
    topicmeta.class = "class";
    topicmeta.outputclass = "outputclass";

    expect(topicmeta.dir).to.equal("dir");
    expect(topicmeta["xml:lang"]).to.equal("lang");
    expect(topicmeta.translate).to.equal("translate");
    expect(topicmeta.class).to.equal("class");
    expect(topicmeta.outputclass).to.equal("outputclass");
  });
});