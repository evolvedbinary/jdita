import { doNodeTest } from "../tests";
import { DtNode, isDtNode } from "./dt";
doNodeTest(DtNode, 'dt', isDtNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['%all-inline*']);