import { doNodeTest } from "../tests";
import { SimpleTableNode, isSimpleTableNode } from "../nodes/simple-table";
doNodeTest(SimpleTableNode, 'simpletable', isSimpleTableNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['sthead?', 'strow+']);