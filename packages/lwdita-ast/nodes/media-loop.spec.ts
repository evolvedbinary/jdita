import { doNodeTest } from "../tests";
import { MediaLoopNode, isMediaLoopNode } from "./media-loop";
doNodeTest(MediaLoopNode, 'media-loop', isMediaLoopNode,
  ['dir', 'xml:lang', 'translate', 'name', 'value', 'outputclass', 'class']);