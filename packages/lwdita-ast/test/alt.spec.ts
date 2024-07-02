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
import { AltNode, isAltNode } from "../src/nodes/alt";
import { expect } from "chai";

doNodeTest(AltNode, 'alt', isAltNode,
  ['outputclass', 'class', 'keyref', 'dir', 'xml:lang', 'translate'],
  ['(text|%ph)*']);

describe('Class AltNode', () => {
  it("sets correct attributes", () => {
    const alt = new AltNode({});

    alt.keyref = "keyref";
    alt.outputclass = "outputclass";
    alt.class = "class";
    alt.dir = "dir";
    alt["xml:lang"] = "lang";
    alt.translate = "translate";

    expect(alt.keyref).to.equal("keyref");
    expect(alt.outputclass).to.equal("outputclass");
    expect(alt.class).to.equal("class");
    expect(alt.dir).to.equal("dir");
    expect(alt["xml:lang"]).to.equal("lang");
    expect(alt.translate).to.equal("translate");
  });
});