import { doNodeTest } from "../tests";
import { VideoPosterNode, isVideoPosterNode } from "./video-poster";
doNodeTest(VideoPosterNode, 'video-poster', isVideoPosterNode,
  ['dir', 'xml:lang', 'translate', 'name', 'value', 'outputclass', 'class']);