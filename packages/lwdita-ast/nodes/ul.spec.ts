import { doNodeTest } from "../tests";
import { UlNode, isUlNode } from "./ul";
doNodeTest(UlNode, 'ul', isUlNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['li+']);