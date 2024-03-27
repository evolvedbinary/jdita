import { doNodeTest } from "../tests";
import { LiNode, isLiNode } from "../nodes/li";
doNodeTest(LiNode, 'li', isLiNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['%list-blocks*']);