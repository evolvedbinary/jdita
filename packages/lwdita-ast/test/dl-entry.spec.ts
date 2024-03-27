import { doNodeTest } from "../tests";
import { DlEntryNode, isDlEntryNode } from "../nodes/dl-entry";
doNodeTest(DlEntryNode, 'dlentry', isDlEntryNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['dt', 'dd']);