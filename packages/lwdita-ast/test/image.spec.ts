import { doNodeTest } from "../tests";
import { ImageNode, isImageNode } from "../nodes/image";
doNodeTest(ImageNode, 'image', isImageNode,
  ['href', 'format', 'scope', 'height', 'width', 'dir', 'xml:lang', 'translate', 'props', 'keyref', 'outputclass', 'class'],
  ['alt?']);