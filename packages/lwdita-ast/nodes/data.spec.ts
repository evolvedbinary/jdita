import { doNodeTest } from "../tests";
import { DataNode, isDataNode } from "./data";
doNodeTest(DataNode, 'data', isDataNode,
  ['dir', 'xml:lang', 'translate', 'name', 'value', 'href', 'format', 'scope', 'keyref', 'props', 'outputclass', 'class'],
  ['(text|%data)*']);