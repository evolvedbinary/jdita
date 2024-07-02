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
import { DdNode, isDdNode } from "../src/nodes/dd";
import { expect } from "chai";

doNodeTest(
  DdNode,
  'dd',
  isDdNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['%list-blocks*']
);

describe('Class DdNode', () => {
  it("sets correct attributes", () => {
    const dd = new DdNode({});

    dd.dir = "dir";
    dd["xml:lang"] = "lang";
    dd.translate = "translate";
    dd.props = "props";
    dd.id = "id";
    dd.conref = "conref";
    dd.outputclass = "outputclass";
    dd.class = "class";

    expect(dd.dir).to.equal("dir");
    expect(dd["xml:lang"]).to.equal("lang");
    expect(dd.translate).to.equal("translate");
    expect(dd.props).to.equal("props");
    expect(dd.id).to.equal("id");
    expect(dd.conref).to.equal("conref");
    expect(dd.outputclass).to.equal("outputclass");
    expect(dd.class).to.equal("class");
  });
});