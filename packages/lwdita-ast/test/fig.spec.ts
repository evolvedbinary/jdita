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
import { FigNode, isFigNode } from "../src/nodes/fig";
import { expect } from "chai";

doNodeTest(
  FigNode,
  'fig',
  isFigNode,
  ['scale', 'frame', 'expanse', 'dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['title?', 'desc?', '(%fig-blocks|image|xref)*']
);

describe('Class FigNode', () => {
  it("sets correct attributes", () => {
    const fig = new FigNode({});

    fig.scale = 100;
    fig.frame = "all";
    fig.expanse = "page";
    fig.dir = "dir";
    fig["xml:lang"] = "lang";
    fig.translate = "translate";
    fig.props = "props";
    fig.id = "id";
    fig.conref = "conref";
    fig.outputclass = "outputclass";
    fig.class = "class";

    expect(fig.scale).to.equal(100);
    expect(fig.frame).to.equal("all");
    expect(fig.expanse).to.equal("page");
    expect(fig.dir).to.equal("dir");
    expect(fig["xml:lang"]).to.equal("lang");
    expect(fig.translate).to.equal("translate");
    expect(fig.props).to.equal("props");
    expect(fig.id).to.equal("id");
    expect(fig.conref).to.equal("conref");
    expect(fig.outputclass).to.equal("outputclass");
    expect(fig.class).to.equal("class");
  });
});