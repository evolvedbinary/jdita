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
import { DivNode, isDivNode } from "../src/nodes/div";
import { expect } from "chai";

doNodeTest(
  DivNode,
  'div',
  isDivNode,
  ['dir', 'xml:lang', 'translate', 'props', 'outputclass', 'class'],
  ['fn+']
);

describe('Class DivNode', () => {
  it('sets correct attributes', () => {
    const div = new DivNode({});

    div.dir = 'dir';
    div['xml:lang'] = 'lang';
    div.translate = 'translate';
    div.props = 'props';
    div.outputclass = 'outputclass';
    div.class = 'class';

    expect(div.dir).to.equal('dir');
    expect(div['xml:lang']).to.equal('lang');
    expect(div.translate).to.equal('translate');
    expect(div.props).to.equal('props');
    expect(div.outputclass).to.equal('outputclass');
    expect(div.class).to.equal('class');
  });
});