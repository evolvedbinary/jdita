import { doNodeTest } from "../tests";
import { StRowNode, isStRowNode } from "../nodes/strow";
doNodeTest(StRowNode, 'strow', isStRowNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['stentry*']);