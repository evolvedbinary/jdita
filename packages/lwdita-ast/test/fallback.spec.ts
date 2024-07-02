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
import { FallbackNode, isFallbackNode } from "../src/nodes/fallback";
import { expect } from "chai";

doNodeTest(
  FallbackNode,
  'fallback',
  isFallbackNode,
  ['dir', 'xml:lang', 'translate', 'props', 'class', 'outputclass'],
  ['%fallback-blocks*']
);

describe('Class FallbackNodeNode', () => {
  it("sets correct attributes", () => {
    const fallback = new FallbackNode({});

    fallback.dir = "dir";
    fallback["xml:lang"] = "lang";
    fallback.translate = "translate";
    fallback.props = "props";
    fallback.class = "class";
    fallback.outputclass = "outputclass";

    expect(fallback.dir).to.equal("dir");
    expect(fallback["xml:lang"]).to.equal("lang");
    expect(fallback.translate).to.equal("translate");
    expect(fallback.props).to.equal("props");
    expect(fallback.class).to.equal("class");
    expect(fallback.outputclass).to.equal("outputclass");
  });
});