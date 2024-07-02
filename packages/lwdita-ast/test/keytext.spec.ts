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
import { isKeytextNode, KeytextNode } from "../src/nodes/keytext";
import { expect } from "chai";

doNodeTest(
  KeytextNode,
  'keytext',
  isKeytextNode,
  ['dir', 'xml:lang', 'translate', 'class', 'outputclass'],
  ['(text|%ph)*']
);

describe('Class KeytextNode', () => {
  it('sets correct attributes', () => {
    const keytext = new KeytextNode({});

    keytext.dir = 'dir';
    keytext['xml:lang'] = 'lang';
    keytext.translate = 'translate';
    keytext.outputclass = 'outputclass';
    keytext.class = 'class';

    expect(keytext.dir).to.equal('dir');
    expect(keytext['xml:lang']).to.equal('lang');
    expect(keytext.translate).to.equal('translate');
    expect(keytext.outputclass).to.equal('outputclass');
    expect(keytext.class).to.equal('class');
  });
});