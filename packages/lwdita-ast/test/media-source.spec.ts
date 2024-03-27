import { doNodeTest } from "../tests";
import { MediaSourceNode, isMediaSourceNode } from "../nodes/media-source";
doNodeTest(MediaSourceNode, 'media-source', isMediaSourceNode,
  ['dir', 'xml:lang', 'translate', 'name', 'value', 'outputclass', 'class']);