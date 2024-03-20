import { doNodeTest } from "../tests";
import { SubscriptNode, isSubscriptNode } from "./subscript";
doNodeTest(SubscriptNode, 'sub', isSubscriptNode,
  ['dir', 'xml:lang', 'translate', 'keyref', 'outputclass', 'class'],
  ['%all-inline*']);