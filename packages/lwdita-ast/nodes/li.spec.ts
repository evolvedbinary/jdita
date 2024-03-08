import { doNodeTest } from "../tests";
import { LiNode, isLiNode } from "./li";
doNodeTest(LiNode, 'li', isLiNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['%list-blocks*']);