import { doNodeTest } from "../tests";
import { XRefNode, isXRefNode } from "./xref";
doNodeTest(XRefNode, 'xref', isXRefNode,
  ['href', 'format', 'scope', 'dir', 'xml:lang', 'translate', 'props', 'keyref', 'outputclass', 'class'],
  ['%common-inline*']);