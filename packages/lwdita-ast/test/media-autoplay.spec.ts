import { doNodeTest } from "../tests";
import { MediaControlsNode, isMediaControlsNode } from "../nodes/media-controls";
doNodeTest(MediaControlsNode, 'media-controls', isMediaControlsNode,
  ['dir', 'xml:lang', 'translate', 'name', 'value', 'outputclass', 'class']);