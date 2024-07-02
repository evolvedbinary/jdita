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
import { DlEntryNode, isDlEntryNode } from "../src/nodes/dl-entry";
import { expect } from "chai";

doNodeTest(
  DlEntryNode,
  'dlentry',
  isDlEntryNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['dt', 'dd']
);

describe('Class DlEntryNode', () => {
  it("sets correct attributes", () => {
    const dlentry = new DlEntryNode({});

    dlentry.dir = "dir";
    dlentry["xml:lang"] = "lang";
    dlentry.translate = "translate";
    dlentry.props = "props";
    dlentry.id = "id";
    dlentry.conref = "conref";
    dlentry.outputclass = "outputclass";
    dlentry.class = "class";

    expect(dlentry.dir).to.equal("dir");
    expect(dlentry["xml:lang"]).to.equal("lang");
    expect(dlentry.translate).to.equal("translate");
    expect(dlentry.props).to.equal("props");
    expect(dlentry.id).to.equal("id");
    expect(dlentry.conref).to.equal("conref");
    expect(dlentry.outputclass).to.equal("outputclass");
    expect(dlentry.class).to.equal("class");
  });
});