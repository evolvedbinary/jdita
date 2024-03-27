import { doNodeTest } from "../tests";
import { ShortDescNode, isShortDescNode } from "../nodes/shortdesc";
doNodeTest(ShortDescNode, 'shortdesc', isShortDescNode,
  ['dir', 'xml:lang', 'translate', 'props', 'outputclass', 'class'],
  ['%all-inline*']);