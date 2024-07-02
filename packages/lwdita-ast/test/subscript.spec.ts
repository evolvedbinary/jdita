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
import { SubscriptNode, isSubscriptNode } from "../src/nodes/subscript";
import { expect } from "chai";

doNodeTest(
  SubscriptNode,
  'sub',
  isSubscriptNode,
  ['outputclass', 'class', 'keyref', 'dir', 'xml:lang', 'translate'],
  ['%inline.noimage*']
);

describe('Class SubscriptNode', () => {
  it('sets correct attributes', () => {
    const sub = new SubscriptNode({});

    sub.keyref = "keyref";
    sub.outputclass = "outputclass";
    sub.class = "class";
    sub.dir = "dir";
    sub["xml:lang"] = "lang";
    sub.translate = "translate";

    expect(sub.keyref).to.equal("keyref");
    expect(sub.outputclass).to.equal("outputclass");
    expect(sub.class).to.equal("class");
    expect(sub.dir).to.equal("dir");
    expect(sub["xml:lang"]).to.equal("lang");
    expect(sub.translate).to.equal("translate");
  });
});