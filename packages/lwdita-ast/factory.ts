import { TopicNode } from "./nodes/topic";
import { TitleNode } from "./nodes/title";
import { PhNode } from "./nodes/ph";
import { ShortDescNode } from "./nodes/shortdesc";
import { DlNode } from "./nodes/dl";
import { DlEntryNode } from "./nodes/dl-entry";
import { DtNode } from "./nodes/dt";
import { DdNode } from "./nodes/dd";
import { BodyNode } from "./nodes/body";
import { PNode } from "./nodes/p";
import { ImageNode } from "./nodes/image";
import { AltNode } from "./nodes/alt";
import { FigNode } from "./nodes/fig";
import { BaseNode, TextNode, Constructor } from "./nodes";
import { SectionNode } from "./nodes/section";
import { LiNode } from "./nodes/li";
import { UlNode } from "./nodes/ul";
import { OlNode } from "./nodes/ol";
import { SimpleTableNode } from "./nodes/simple-table";
import { StHeadNode } from "./nodes/sthead";
import { StRowNode } from "./nodes/strow";
import { StEntryNode } from "./nodes/stentry";
import { PrologNode } from "./nodes/prolog";
import { DataNode } from "./nodes/data";
import { NoteNode } from "./nodes/note";
import { DescNode } from "./nodes/desc";
import { XRefNode } from "./nodes/xref";
import { AudioNode } from "./nodes/audio";
import { VideoNode } from "./nodes/video";
import { MediaControlsNode } from "./nodes/media-controls";
import { VideoPosterNode } from "./nodes/video-poster";
import { MediaAutoplayNode } from "./nodes/media-autoplay";
import { MediaLoopNode } from "./nodes/media-loop";
import { MediaMutedNode } from "./nodes/media-muted";
import { MediaSourceNode } from "./nodes/media-source";
import { MediaTrackNode } from "./nodes/media-track";
import { PreNode } from "./nodes/pre";
import { FnNode } from "./nodes/fn";
import { BoldNode } from "./nodes/bold";
import { ItalicNode } from "./nodes/italic";
import { UnderlinedNode } from "./nodes/underlined";
import { SubscriptNode } from "./nodes/subscript";
import { SuperscriptNode } from "./nodes/superscript";
import { XMLNode } from "@jdita/lwdita-xml/classes";
import { UnknownNodeError } from "./ast-classes";

/**
 * getNodeClass - Get the Node class constructor based on the node type
 *
 * @privateRemarks
 * TODO: Add tests
 *
 * @param name - A string containing the node name
 * @returns - The node class constructor
 * @throws - UnknownNodeError
 */
export function getNodeClass(name: string): Constructor {
  switch (name) {
    case 'alt': return AltNode;
    case 'audio': return AudioNode;
    case 'b': return BoldNode;
    case 'body': return BodyNode;
    case 'data': return DataNode;
    case 'dd': return DdNode;
    case 'desc': return DescNode;
    case 'dl': return DlNode;
    case 'dlentry': return DlEntryNode;
    case 'dt': return DtNode;
    case 'fig': return FigNode;
    case 'fn': return FnNode;
    case 'i': return ItalicNode;
    case 'image': return ImageNode;
    case 'media-autoplay': return MediaAutoplayNode;
    case 'media-controls': return MediaControlsNode;
    case 'media-loop': return MediaLoopNode;
    case 'media-muted': return MediaMutedNode;
    case 'media-source': return MediaSourceNode;
    case 'media-track': return MediaTrackNode;
    case 'li': return LiNode;
    case 'note': return NoteNode;
    case 'ol': return OlNode;
    case 'p': return PNode;
    case 'ph': return PhNode;
    case 'pre': return PreNode;
    case 'prolog': return PrologNode;
    case 'section': return SectionNode;
    case 'simpletable': return SimpleTableNode;
    case 'shortdesc': return ShortDescNode;
    case 'stentry': return StEntryNode;
    case 'sthead': return StHeadNode;
    case 'strow': return StRowNode;
    case 'sub': return SubscriptNode;
    case 'sup': return SuperscriptNode;
    case 'title': return TitleNode;
    case 'topic': return TopicNode;
    case 'u': return UnderlinedNode;
    case 'ul': return UlNode;
    case 'video': return VideoNode;
    case 'video-poster': return VideoPosterNode;
    case 'xref': return XRefNode;
    default:
      throw new UnknownNodeError('unkonwn node "' + name + '"');
  }
}

/**
 * getNodeClassType
 *
 * @privateRemarks
 * This function is never used, remove this function if not needed
 *
 * @param name - String
 * @returns A node of type BaseNode
 */
export function getNodeClassType(name: string): typeof BaseNode {
  return getNodeClass(name) as unknown as typeof BaseNode;
}

/**
 * createNode - Overloaded function `createNode` that creates different types of nodes based on the input XMLNode type.
 *
 * @remarks
 * The function has multiple signatures for different XMLNode types like `'pre', 'prolog', 'section'`, etc.
 * Each signature returns a different type of node corresponding to the input XMLNode type.
 * The function also has a generic signature that accepts any XMLNode and returns a node of type BaseNode or derived from BaseNode.
 * If the input is a string, the function creates a TextNode.
 * If the input is an XMLNode, the function uses the `getNodeClass` function to create a node of the appropriate type.
 * If the node type is unknown, `getNodeClass` will throw an error.
 *
 * @privateRemarks
 * TODO: Add tests
 *
 * @param node - The XMLNode object or string to be converted into a node.
 *
 * @returns A node of the type corresponding to the input XMLNode type or a TextNode if the input is a string.
 *
 * @throws Will throw an error if the node type is unknown.
 */
export function createNode(node: string): TextNode;
export function createNode(node: XMLNode<'audio'>): AudioNode;
export function createNode(node: XMLNode<'alt'>): AltNode;
export function createNode(node: XMLNode<'b'>): BoldNode;
export function createNode(node: XMLNode<'body'>): BodyNode;
export function createNode(node: XMLNode<'data'>): DataNode;
export function createNode(node: XMLNode<'dd'>): DdNode;
export function createNode(node: XMLNode<'desc'>): DescNode;
export function createNode(node: XMLNode<'dl'>): DlNode;
export function createNode(node: XMLNode<'dlentry'>): DlEntryNode;
export function createNode(node: XMLNode<'dt'>): DtNode;
export function createNode(node: XMLNode<'fig'>): FigNode;
export function createNode(node: XMLNode<'fn'>): FnNode;
export function createNode(node: XMLNode<'i'>): ItalicNode;
export function createNode(node: XMLNode<'image'>): ImageNode;
export function createNode(node: XMLNode<'li'>): LiNode;
export function createNode(node: XMLNode<'media-autoplay'>): MediaAutoplayNode;
export function createNode(node: XMLNode<'media-controls'>): MediaControlsNode;
export function createNode(node: XMLNode<'media-loop'>): MediaLoopNode;
export function createNode(node: XMLNode<'media-muted'>): MediaMutedNode;
export function createNode(node: XMLNode<'media-source'>): MediaSourceNode;
export function createNode(node: XMLNode<'media-track'>): MediaTrackNode;
export function createNode(node: XMLNode<'note'>): NoteNode;
export function createNode(node: XMLNode<'ol'>): OlNode;
export function createNode(node: XMLNode<'p'>): PNode;
export function createNode(node: XMLNode<'ph'>): PhNode;
export function createNode(node: XMLNode<'pre'>): PreNode;
export function createNode(node: XMLNode<'prolog'>): PrologNode;
export function createNode(node: XMLNode<'section'>): SectionNode;
export function createNode(node: XMLNode<'simpletable'>): SimpleTableNode;
export function createNode(node: XMLNode<'shortdesc'>): ShortDescNode;
export function createNode(node: XMLNode<'stentry'>): StEntryNode;
export function createNode(node: XMLNode<'sthead'>): StHeadNode;
export function createNode(node: XMLNode<'strow'>): StRowNode;
export function createNode(node: XMLNode<'sub'>): SubscriptNode;
export function createNode(node: XMLNode<'sup'>): SuperscriptNode;
export function createNode(node: XMLNode<'title'>): TitleNode;
export function createNode(node: XMLNode<'topic'>): TopicNode;
export function createNode(node: XMLNode<'u'>): UnderlinedNode;
export function createNode(node: XMLNode<'ul'>): UlNode;
export function createNode(node: XMLNode<'video'>): VideoNode;
export function createNode(node: XMLNode<'video-poster'>): VideoPosterNode;
export function createNode(node: XMLNode<'xref'>): XRefNode;
export function createNode<T extends BaseNode = BaseNode>(node: XMLNode): T;
export function createNode<T extends BaseNode>(node: XMLNode | string): T {

  let nodeObject: BaseNode;
  /**
   * @example
   * `node`is an object containing the node name, its attributes, and their values.
   * ```json
   * {
   *   name: 'topic',
   *   attributes: [Object: null prototype] {},
   *   ns: [Object: null prototype] {},
   *   prefix: '',
   *   local: 'topic',
   *   uri: '',
   *   isSelfClosing: false
   * }
   * ```
   * If the node is a text node, it will simply contain its string content.
   */
  if (typeof node === 'string') {
    nodeObject = new TextNode(node);
  } else {
    const classType = getNodeClass(node.name);
    return new classType(node.attributes) as T;
  }
  return nodeObject as T;
}