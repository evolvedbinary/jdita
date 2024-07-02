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
import { XRefNode, isXRefNode } from "../src/nodes/xref";
import { expect } from "chai";

doNodeTest(
  XRefNode,
  'xref',
  isXRefNode,
  ['props', 'dir', 'xml:lang', 'translate', 'href', 'format', 'scope', 'keyref','outputclass', 'class'],
  ['%inline.noxref*']
);

describe('Class XRefNode', () => {
  it("sets correct attributes", () => {
    const xref = new XRefNode({});

    xref.props = "props";
    xref.dir = "dir";
    xref["xml:lang"] = "lang";
    xref.translate = "translate";
    xref.href = "href";
    xref.format = "format";
    xref.scope = "local";
    xref.keyref = "keyref";
    xref.outputclass = "outputclass";
    xref.class = "class";

    expect(xref.props).to.equal("props");
    expect(xref.dir).to.equal("dir");
    expect(xref["xml:lang"]).to.equal("lang");
    expect(xref.translate).to.equal("translate");
    expect(xref.href).to.equal("href");
    expect(xref.format).to.equal("format");
    expect(xref.scope).to.equal("local");
    expect(xref.keyref).to.equal("keyref");
    expect(xref.outputclass).to.equal("outputclass");
    expect(xref.class).to.equal("class");
  });
});