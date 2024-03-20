import { doNodeTest } from "../tests";
import { TitleNode, isTitleNode } from "./title";
doNodeTest(TitleNode, 'title', isTitleNode,
  ['dir', 'xml:lang', 'translate', 'outputclass', 'class'],
  ['%common-inline*']);