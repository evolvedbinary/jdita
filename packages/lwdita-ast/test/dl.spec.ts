import { doNodeTest } from "../tests";
import { DlNode, isDlNode } from "../nodes/dl";
doNodeTest(DlNode, 'dl', isDlNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['dlentry+']);