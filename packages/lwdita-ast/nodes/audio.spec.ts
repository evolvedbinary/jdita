import { doNodeTest } from "../tests";
import { AudioNode, isAudioNode } from "./audio";
doNodeTest(AudioNode, 'audio', isAudioNode,
  ['outputclass', 'class', 'dir', 'xml:lang', 'translate', 'props', 'id', 'conref'],
  ['desc?', 'media-controls?', 'media-autoplay?', 'media-loop?', 'media-muted?', 'media-source*', 'media-track*']);