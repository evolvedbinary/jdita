import { doNodeTest } from "../tests";
import { BodyNode, isBodyNode } from "./body";
doNodeTest(BodyNode, 'body', isBodyNode,
  ['dir', 'xml:lang', 'translate', 'outputclass', 'class'],
  ['%list-blocks*', 'section*', 'fn*']);