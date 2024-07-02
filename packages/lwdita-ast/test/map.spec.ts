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
import { MapNode, isMapNode } from "../src/nodes/map";
import { expect } from "chai";

doNodeTest(MapNode, 'map', isMapNode,
  ['dir', 'xml:lang', 'translate', 'class', 'outputclass', 'specializations', 'id', 'xmlns:ditaarch', 'ditaarch:DITAArchVersion'],
  ['topicmeta?', ['topicref*', 'keydef*']]);

describe('Class MapNode', () => {
  it("sets correct attributes", () => {
    const map = new MapNode({});

    map.dir = "dir";
    map["xml:lang"] = "lang";
    map.translate = "translate";
    map.class = "class";
    map.outputclass = "outputclass";
    map.id = "id";
    map["xmlns:ditaarch"] = "xmlns:ditaarch";
    map["ditaarch:DITAArchVersion"] = "ditaarch:DITAArchVersion";
    map.specializations = "&included-domains;";

    expect(map.dir).to.equal("dir");
    expect(map["xml:lang"]).to.equal("lang");
    expect(map.translate).to.equal("translate");
    expect(map.class).to.equal("class");
    expect(map.outputclass).to.equal("outputclass");
    expect(map.id).to.equal("id");
    expect(map["xmlns:ditaarch"]).to.equal("xmlns:ditaarch");
    expect(map["ditaarch:DITAArchVersion"]).to.equal("ditaarch:DITAArchVersion");
    expect(map.specializations).to.equal("&included-domains;");
  });
});