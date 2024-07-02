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
import { UnderlinedNode, isUnderlinedNode } from "../src/nodes/underlined";
import { expect } from "chai";

doNodeTest(
  UnderlinedNode,
  'u',
  isUnderlinedNode,
  ['outputclass', 'class', 'keyref', 'dir', 'xml:lang', 'translate'],
  ['%inline.noimage*']
);

describe('Class UnderlinedNode', () => {
  it('sets correct attributes', () => {
    const u = new UnderlinedNode({});

    u.keyref = "keyref";
    u.outputclass = "outputclass";
    u.class = "class";
    u.dir = "dir";
    u["xml:lang"] = "lang";
    u.translate = "translate";

    expect(u.keyref).to.equal("keyref");
    expect(u.outputclass).to.equal("outputclass");
    expect(u.class).to.equal("class");
    expect(u.dir).to.equal("dir");
    expect(u["xml:lang"]).to.equal("lang");
    expect(u.translate).to.equal("translate");
  });
});