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
import { StrongNode, isStrongNode } from "../src/nodes/strong";
import { expect } from "chai";

doNodeTest(
  StrongNode,
  'strong',
  isStrongNode,
  ['outputclass', 'class', 'keyref', 'dir', 'xml:lang', 'translate'],
  ['%inline.noimage*']
);

describe('Class StrongNode', () => {
  it('sets correct attributes', () => {
    const strong = new StrongNode({});

    strong.keyref = "keyref";
    strong.outputclass = "outputclass";
    strong.class = "class";
    strong.dir = "dir";
    strong["xml:lang"] = "lang";
    strong.translate = "translate";

    expect(strong.keyref).to.equal("keyref");
    expect(strong.outputclass).to.equal("outputclass");
    expect(strong.class).to.equal("class");
    expect(strong.dir).to.equal("dir");
    expect(strong["xml:lang"]).to.equal("lang");
    expect(strong.translate).to.equal("translate");
  });
});