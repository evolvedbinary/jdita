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
import { SuperscriptNode, isSuperscriptNode } from "../src/nodes/superscript";
import { expect } from "chai";

doNodeTest(
  SuperscriptNode,
  'sup',
  isSuperscriptNode,
  ['outputclass', 'class', 'keyref', 'dir', 'xml:lang', 'translate'],
  ['%inline.noimage*']
);

describe('Class SuperscriptNode', () => {
  it('sets correct attributes', () => {
    const sup = new SuperscriptNode({});

    sup.keyref = "keyref";
    sup.outputclass = "outputclass";
    sup.class = "class";
    sup.dir = "dir";
    sup["xml:lang"] = "lang";
    sup.translate = "translate";

    expect(sup.keyref).to.equal("keyref");
    expect(sup.outputclass).to.equal("outputclass");
    expect(sup.class).to.equal("class");
    expect(sup.dir).to.equal("dir");
    expect(sup["xml:lang"]).to.equal("lang");
    expect(sup.translate).to.equal("translate");
  });
});