import { doNodeTest } from "../tests";
import { MediaSourceNode, isMediaSourceNode } from "./media-source";
doNodeTest(MediaSourceNode, 'media-source', isMediaSourceNode,
  ['dir', 'xml:lang', 'translate', 'name', 'value', 'outputclass', 'class']);