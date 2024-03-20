import { doNodeTest } from "../tests";
import { TopicNode, isTopicNode } from "./topic";
doNodeTest(TopicNode, 'topic', isTopicNode,
  ['xmlns:ditaarch', 'ditaarch:DITAArchVersion', 'outputclass', 'class', 'dir', 'xml:lang', 'translate', 'domains', 'id'],
  ['title', 'shortdesc?', 'prolog?', 'body?']);