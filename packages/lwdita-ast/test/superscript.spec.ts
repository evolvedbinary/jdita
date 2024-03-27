import { doNodeTest } from "../tests";
import { SuperscriptNode, isSuperscriptNode } from "../nodes/superscript";
doNodeTest(SuperscriptNode, 'sup', isSuperscriptNode,
  ['dir', 'xml:lang', 'translate', 'keyref', 'outputclass', 'class'],
  ['%all-inline*']);