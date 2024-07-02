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
import { EmNode, isEmNode } from "../src/nodes/em";
import { expect } from "chai";

doNodeTest(
  EmNode,
  'em',
  isEmNode,
  ['outputclass', 'class', 'keyref', 'dir', 'xml:lang', 'translate'],
  ['%inline.noimage*']
);

describe('Class EmNode', () => {
  it('sets correct attributes', () => {
    const em = new EmNode({});

    em.keyref = "keyref";
    em.outputclass = "outputclass";
    em.class = "class";
    em.dir = "dir";
    em["xml:lang"] = "lang";
    em.translate = "translate";

    expect(em.keyref).to.equal("keyref");
    expect(em.outputclass).to.equal("outputclass");
    expect(em.class).to.equal("class");
    expect(em.dir).to.equal("dir");
    expect(em["xml:lang"]).to.equal("lang");
    expect(em.translate).to.equal("translate");
  });
});