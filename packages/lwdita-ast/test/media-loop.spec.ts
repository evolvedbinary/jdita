import { doNodeTest } from "../tests";
import { MediaLoopNode, isMediaLoopNode } from "../nodes/media-loop";
doNodeTest(MediaLoopNode, 'media-loop', isMediaLoopNode,
  ['dir', 'xml:lang', 'translate', 'name', 'value', 'outputclass', 'class']);