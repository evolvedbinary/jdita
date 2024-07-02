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
import { TtNode, isTtNode } from "../src/nodes/tt";
import { expect } from "chai";

doNodeTest(
  TtNode,
  'tt',
  isTtNode,
  ['outputclass', 'class', 'keyref', 'dir', 'xml:lang', 'translate'],
  ['%inline.noimage*']
);

describe('Class TtNode', () => {
  it('sets correct attributes', () => {
    const tt = new TtNode({});

    tt.keyref = "keyref";
    tt.outputclass = "outputclass";
    tt.class = "class";
    tt.dir = "dir";
    tt["xml:lang"] = "lang";
    tt.translate = "translate";

    expect(tt.keyref).to.equal("keyref");
    expect(tt.outputclass).to.equal("outputclass");
    expect(tt.class).to.equal("class");
    expect(tt.dir).to.equal("dir");
    expect(tt["xml:lang"]).to.equal("lang");
    expect(tt.translate).to.equal("translate");
  });
});