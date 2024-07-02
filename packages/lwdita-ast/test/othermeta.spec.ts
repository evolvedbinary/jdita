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
import { OthermetaNode, isOthermetaNode } from "../src/nodes/othermeta";
import { expect } from "chai";

doNodeTest(
  OthermetaNode,
  'othermeta',
  isOthermetaNode,
  ['name', 'content', 'class', 'dir', 'xml:lang', 'translate']
);

describe('Class OthermetaNode', () => {
  it("sets correct attributes", () => {
    const othermeta = new OthermetaNode({});

    othermeta.dir = "dir";
    othermeta["xml:lang"] = "lang";
    othermeta.translate = "translate";
    othermeta.class = "class";
    othermeta.name = "name";
    othermeta.content = "content";

    expect(othermeta.dir).to.equal("dir");
    expect(othermeta["xml:lang"]).to.equal("lang");
    expect(othermeta.translate).to.equal("translate");
    expect(othermeta.class).to.equal("class");
    expect(othermeta.name).to.equal("name");
    expect(othermeta.content).to.equal("content");
  });
});