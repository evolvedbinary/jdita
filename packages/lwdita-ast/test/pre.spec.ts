import { doNodeTest } from "../tests";
import { PreNode, isPreNode } from "../nodes/pre";
doNodeTest(PreNode, 'pre', isPreNode,
  ['xml:space', 'dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['(text|%ph|xref|%data)*']);