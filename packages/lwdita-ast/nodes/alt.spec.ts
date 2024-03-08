import { doNodeTest } from "../tests";
import { AltNode, isAltNode } from "./alt";
doNodeTest(AltNode, 'alt', isAltNode,
  ['outputclass', 'class', 'keyref', 'dir', 'xml:lang', 'translate', 'props'],
  ['(text|%ph|%data)*']);