import { doNodeTest } from "../tests";
import { MediaTrackNode, isMediaTrackNode } from "../nodes/media-track";
doNodeTest(MediaTrackNode, 'media-track', isMediaTrackNode,
  ['dir', 'xml:lang', 'translate', 'name', 'value', 'type', 'outputclass', 'class']);