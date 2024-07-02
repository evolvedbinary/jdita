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
import { DescNode, isDescNode } from "../src/nodes/desc";
import { expect } from "chai";

doNodeTest(
  DescNode,
  'desc',
  isDescNode,
  ['dir', 'xml:lang', 'translate', 'props', 'outputclass', 'class'],
  ['%inline.noxref*']
);

describe('Class DescNode', () => {
  it("sets correct attributes", () => {
    const desc = new DescNode({});

    desc.dir = "dir";
    desc["xml:lang"] = "lang";
    desc.translate = "translate";
    desc.props = "props";
    desc.outputclass = "outputclass";
    desc.class = "class";

    expect(desc.dir).to.equal("dir");
    expect(desc["xml:lang"]).to.equal("lang");
    expect(desc.translate).to.equal("translate");
    expect(desc.props).to.equal("props");
    expect(desc.outputclass).to.equal("outputclass");
    expect(desc.class).to.equal("class");
  });
});