import { doNodeTest } from "../tests";
import { SimpleTableNode, isSimpleTableNode } from "./simple-table";
doNodeTest(SimpleTableNode, 'simpletable', isSimpleTableNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['sthead?', 'strow+']);