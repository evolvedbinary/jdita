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
import { BodyNode, isBodyNode } from "../src/nodes/body";
import { expect } from "chai";

doNodeTest(
  BodyNode,
  'body',
  isBodyNode,
  ['dir', 'xml:lang', 'translate', 'outputclass', 'class'],
  ['%list-blocks*', 'section*', 'div?']
);

describe('Class BodyNode', () => {
  it("sets correct attributes", () => {
    const body = new BodyNode({});

    body.dir = "dir";
    body["xml:lang"] = "lang";
    body.translate = "translate";
    body.outputclass = "outputclass";
    body.class = "class";

    expect(body.dir).to.equal("dir");
    expect(body["xml:lang"]).to.equal("lang");
    expect(body.translate).to.equal("translate");
    expect(body.outputclass).to.equal("outputclass");
    expect(body.class).to.equal("class");
  });
});