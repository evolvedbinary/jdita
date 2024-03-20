import { doNodeTest } from "../tests";
import { SectionNode, isSectionNode } from "./section";
doNodeTest(SectionNode, 'section', isSectionNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['title?', '%all-blocks*']);