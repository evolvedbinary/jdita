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
import { DtNode, isDtNode } from "../src/nodes/dt";
import { expect } from "chai";

doNodeTest(
  DtNode,
  'dt',
  isDtNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['%inline*']
);

describe('Class DtNode', () => {
  it("sets correct attributes", () => {
    const dt = new DtNode({});

    dt.dir = "dir";
    dt["xml:lang"] = "lang";
    dt.translate = "translate";
    dt.props = "props";
    dt.id = "id";
    dt.conref = "conref";
    dt.outputclass = "outputclass";
    dt.class = "class";

    expect(dt.dir).to.equal("dir");
    expect(dt["xml:lang"]).to.equal("lang");
    expect(dt.translate).to.equal("translate");
    expect(dt.props).to.equal("props");
    expect(dt.id).to.equal("id");
    expect(dt.conref).to.equal("conref");
    expect(dt.outputclass).to.equal("outputclass");
    expect(dt.class).to.equal("class");
  });
});