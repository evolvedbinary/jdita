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
import { BoldNode, isBoldNode } from "../src/nodes/bold";
import { expect } from "chai";

doNodeTest(
  BoldNode,
  'b',
  isBoldNode,
  ['outputclass', 'class', 'keyref', 'dir', 'xml:lang', 'translate'],
  ['%inline.noimage*']
);

describe('Class BoldBode', () => {
  it('sets correct attributes', () => {
    const b = new BoldNode({});

    b.keyref = "keyref";
    b.outputclass = "outputclass";
    b.class = "class";
    b.dir = "dir";
    b["xml:lang"] = "lang";
    b.translate = "translate";

    expect(b.keyref).to.equal("keyref");
    expect(b.outputclass).to.equal("outputclass");
    expect(b.class).to.equal("class");
    expect(b.dir).to.equal("dir");
    expect(b["xml:lang"]).to.equal("lang");
    expect(b.translate).to.equal("translate");
  });
});