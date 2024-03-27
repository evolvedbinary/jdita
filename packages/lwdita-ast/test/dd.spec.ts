import { doNodeTest } from "../tests";
import { DdNode, isDdNode } from "../nodes/dd";
doNodeTest(DdNode, 'dd', isDdNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['%list-blocks*']);