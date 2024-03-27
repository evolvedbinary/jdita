import { doNodeTest } from "../tests";
import { PrologNode, isPrologNode } from "../nodes/prolog";
doNodeTest(PrologNode, 'prolog', isPrologNode,
  ['dir', 'xml:lang', 'translate', 'props', 'class'],
  ['%data*']);