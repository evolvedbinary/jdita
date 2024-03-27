import { doNodeTest } from "../tests";
import { PhNode, isPhNode } from "../nodes/ph";
doNodeTest(PhNode, 'ph', isPhNode,
  ['dir', 'xml:lang', 'translate', 'props', 'keyref', 'outputclass', 'class'],
  ['%all-inline*']);