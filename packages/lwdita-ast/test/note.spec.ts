import { doNodeTest } from "../tests";
import { NoteNode, isNoteNode } from "../nodes/note";
doNodeTest(NoteNode, 'note', isNoteNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class', 'type'],
  ['%simple-blocks*']);