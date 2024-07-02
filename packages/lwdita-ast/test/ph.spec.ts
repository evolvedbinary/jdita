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
import { PhNode, isPhNode } from "../src/nodes/ph";
import { expect } from "chai";

doNodeTest(
  PhNode,
  'ph',
  isPhNode,
  ['props', 'dir', 'xml:lang', 'translate', 'keyref', 'class', 'outputclass'],
  ['%inline*']
);

describe('Class PhNode', () => {
  it("sets correct attributes", () => {
    const ph = new PhNode({});

    ph.props = "props";
    ph.dir = "dir";
    ph["xml:lang"] = "lang";
    ph.translate = "translate";
    ph.keyref = "keyref";
    ph.outputclass = "outputclass";
    ph.class = "class";

    expect(ph.props).to.equal("props");
    expect(ph.dir).to.equal("dir");
    expect(ph["xml:lang"]).to.equal("lang");
    expect(ph.keyref).to.equal("keyref");
    expect(ph.translate).to.equal("translate");
    expect(ph.outputclass).to.equal("outputclass");
    expect(ph.class).to.equal("class");
  });
});