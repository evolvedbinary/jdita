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
import { NavtitleNode, isNavtitleNode } from "../src/nodes/navtitle";
import { expect } from "chai";

doNodeTest(
  NavtitleNode,
  'navtitle',
  isNavtitleNode,
  ['outputclass', 'class', 'dir', 'xml:lang', 'translate'],
  ['(text|%ph)*']);

describe('Class NavtitleNode', () => {
  it("sets correct attributes", () => {
    const navtitle = new NavtitleNode({});

    navtitle.outputclass = "outputclass";
    navtitle.class = "class";
    navtitle.dir = "dir";
    navtitle["xml:lang"] = "lang";
    navtitle.translate = "translate";

    expect(navtitle.outputclass).to.equal("outputclass");
    expect(navtitle.class).to.equal("class");
    expect(navtitle.dir).to.equal("dir");
    expect(navtitle["xml:lang"]).to.equal("lang");
    expect(navtitle.translate).to.equal("translate");
  });
});