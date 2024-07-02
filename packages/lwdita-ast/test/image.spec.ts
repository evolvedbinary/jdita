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
import { ImageNode, isImageNode } from "../src/nodes/image";
import { expect } from "chai";

doNodeTest(
  ImageNode,
  'image',
  isImageNode,
  ['href', 'format', 'scope', 'height', 'width', 'dir', 'xml:lang', 'translate', 'keyref', 'outputclass', 'class'],
  ['alt?']
);

describe('Class ImageNode', () => {
  it('sets correct attributes', () => {
    const image = new ImageNode({});

    image.dir = 'dir';
    image["xml:lang"] = 'lang';
    image.translate = 'translate';
    image.keyref = 'keyref';
    image.href = 'href';
    image.format = 'format';
    image.scope = 'local';
    image.height = 'height';
    image.width = 'width';
    image.outputclass = 'outputclass';
    image.class = 'class';

    expect(image.dir).to.equal('dir');
    expect(image["xml:lang"]).to.equal('lang');
    expect(image.translate).to.equal('translate');
    expect(image.keyref).to.equal('keyref');
    expect(image.href).to.equal('href');
    expect(image.format).to.equal('format');
    expect(image.scope).to.equal('local');
    expect(image.height).to.equal('height');
    expect(image.width).to.equal('width');
    expect(image.outputclass).to.equal('outputclass');
    expect(image.class).to.equal('class');
  });
});