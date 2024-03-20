import { doNodeTest } from "../tests";
import { VideoNode, isVideoNode } from "./video";
doNodeTest(VideoNode, 'video', isVideoNode,
  ['outputclass', 'class', 'dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'width', 'height'],
  ['desc?', 'video-poster?', 'media-controls?', 'media-autoplay?', 'media-loop?', 'media-muted?', 'media-source*', 'media-track*']);