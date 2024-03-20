import { doNodeTest } from "../tests";
import { DescNode, isDescNode } from "./desc";
// TODO: caption/figcaption
doNodeTest(DescNode, 'desc', isDescNode,
  ['dir', 'xml:lang', 'translate', 'props', 'outputclass', 'class'],
  ['%common-inline*']);