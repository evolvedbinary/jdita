import { doNodeTest } from "../tests";
import { NoteNode, isNoteNode } from "./note";
doNodeTest(NoteNode, 'note', isNoteNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class', 'type'],
  ['%simple-blocks*']);