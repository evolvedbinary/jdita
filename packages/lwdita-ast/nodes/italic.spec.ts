import { doNodeTest } from "../tests";
import { ItalicNode, isItalicNode } from "./italic";
doNodeTest(ItalicNode, 'i', isItalicNode,
  ['dir', 'xml:lang', 'translate', 'keyref', 'outputclass', 'class'],
  ['%all-inline*']);