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
import { MetadataNode, isMetadataNode } from "../src/nodes/metadata";
import { expect } from "chai";

doNodeTest(
  MetadataNode,
  'metadata',
  isMetadataNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'class', 'outputclass'],
  ['othermeta*']
);

describe('Class MetadataNode', () => {
  it("sets correct attributes", () => {
    const metadata = new MetadataNode({});

    metadata.dir = "dir";
    metadata["xml:lang"] = "lang";
    metadata.translate = "translate";
    metadata.props = "props";
    metadata.id = "id";
    metadata.conref = "conref";
    metadata.class = "class";
    metadata.outputclass = "outputclass";

    expect(metadata.dir).to.equal("dir");
    expect(metadata["xml:lang"]).to.equal("lang");
    expect(metadata.translate).to.equal("translate");
    expect(metadata.props).to.equal("props");
    expect(metadata.id).to.equal("id");
    expect(metadata.conref).to.equal("conref");
    expect(metadata.class).to.equal("class");
    expect(metadata.outputclass).to.equal("outputclass");
  });
});