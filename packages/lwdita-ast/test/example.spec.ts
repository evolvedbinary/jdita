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
import { ExampleNode, isExampleNode } from "../src/nodes/example";
import { expect } from "chai";

doNodeTest(
  ExampleNode,
  'example',
  isExampleNode,
  ['scale', 'frame', 'expanse', 'dir', 'xml:lang', 'translate',  'props', 'id', 'conref', 'outputclass', 'class'],
  ['title?', '%example-blocks']
);

describe('Class ExampleNode', () => {
  it('sets correct attributes', () => {
    const example = new ExampleNode({});

    example.scale = 50;
    example.frame = 'all';
    example.expanse = 'page';
    example.dir = 'dir';
    example['xml:lang'] = 'lang';
    example.translate = 'translate';
    example.props = 'props';
    example.id = 'id';
    example.conref = 'conref';
    example.outputclass = 'outputclass';
    example.class = 'class';

    expect(example.scale).to.equal(50);
    expect(example.frame).to.equal('all');
    expect(example.expanse).to.equal('page');
    expect(example.dir).to.equal('dir');
    expect(example['xml:lang']).to.equal('lang');
    expect(example.translate).to.equal('translate');
    expect(example.props).to.equal('props');
    expect(example.id).to.equal('id');
    expect(example.conref).to.equal('conref');
    expect(example.outputclass).to.equal('outputclass');
    expect(example.class).to.equal('class');
  });
});