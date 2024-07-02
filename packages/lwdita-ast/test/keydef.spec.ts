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
import { KeydefNode, isKeydefNode } from "../src/nodes/keydef";
import { expect } from "chai";

doNodeTest(KeydefNode, 'keydef', isKeydefNode,
  ['dir', 'xml:lang', 'translate', 'props', 'class', 'outputclass', 'href', 'format', 'scope', 'keys', 'processing-role'],
  ['topicmeta?']);

describe('Class KeydefNode', () => {
  it("sets correct attributes", () => {
    const keydef = new KeydefNode({});

    keydef.dir = "dir";
    keydef["xml:lang"] = "lang";
    keydef.translate = "translate";
    keydef.props = "props";
    keydef.class = "class";
    keydef.outputclass = "outputclass";
    keydef.href = "href";
    keydef.format = "format";
    keydef.scope = "local";
    keydef.keys = "keys";
    keydef["processing-role"] = "resource-only";

    expect(keydef.dir).to.equal("dir");
    expect(keydef["xml:lang"]).to.equal("lang");
    expect(keydef.translate).to.equal("translate");
    expect(keydef.props).to.equal("props");
    expect(keydef.class).to.equal("class");
    expect(keydef.outputclass).to.equal("outputclass");
    expect(keydef.href).to.equal("href");
    expect(keydef.format).to.equal("format");
    expect(keydef.scope).to.equal("local");
    expect(keydef.keys).to.equal("keys");
    expect(keydef["processing-role"]).to.equal("resource-only");
  });
});