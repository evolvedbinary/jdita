import { doNodeTest } from "../tests";
import { MediaMutedNode, isMediaMutedNode } from "./media-muted";
doNodeTest(MediaMutedNode, 'media-muted', isMediaMutedNode,
  ['dir', 'xml:lang', 'translate', 'name', 'value', 'outputclass', 'class']);