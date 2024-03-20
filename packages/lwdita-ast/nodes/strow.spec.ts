import { doNodeTest } from "../tests";
import { StRowNode, isStRowNode } from "./strow";
doNodeTest(StRowNode, 'strow', isStRowNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['stentry*']);