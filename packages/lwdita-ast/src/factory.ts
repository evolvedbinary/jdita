/*!
Copyright (C) 2020 Evolved Binary

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { UnknownNodeError } from "./ast-classes";
import { AbstractBaseNode, Constructor } from "./nodes";
import { AltNode } from "./nodes/alt";
import { AudioNode } from "./nodes/audio";
import { BodyNode } from "./nodes/body";
import { BoldNode } from "./nodes/bold";
import { DataNode } from "./nodes/data";
import { DescNode } from "./nodes/desc";
import { DdNode } from "./nodes/dd";
import { DivNode } from "./nodes/div";
import { DlEntryNode } from "./nodes/dl-entry";
import { DlNode } from "./nodes/dl";
import { DtNode } from "./nodes/dt";
import { EmNode } from "./nodes/em";
import { ExampleNode } from "./nodes/example";
import { FallbackNode } from "./nodes/fallback";
import { FigNode } from "./nodes/fig";
import { FnNode } from "./nodes/fn";
import { ImageNode } from "./nodes/image";
import { ItalicNode } from "./nodes/italic";
import { KeydefNode } from "./nodes/keydef";
import { KeytextNode } from "./nodes/keytext";
import { LiNode } from "./nodes/li";
import { MapNode } from "./nodes/map";
import { MediaAutoplayNode } from "./nodes/media-autoplay";
import { MediaControlsNode } from "./nodes/media-controls";
import { MediaLoopNode } from "./nodes/media-loop";
import { MediaMutedNode } from "./nodes/media-muted";
import { MediaSourceNode } from "./nodes/media-source";
import { MediaTrackNode } from "./nodes/media-track";
import { MetadataNode } from "./nodes/metadata";
import { NavtitleNode } from "./nodes/navtitle";
import { NoteNode } from "./nodes/note";
import { OlNode } from "./nodes/ol";
import { OthermetaNode } from "./nodes/othermeta";
import { PhNode } from "./nodes/ph";
import { PNode } from "./nodes/p";
import { PreNode } from "./nodes/pre";
import { PrologNode } from "./nodes/prolog";
import { SectionNode } from "./nodes/section";
import { ShortDescNode } from "./nodes/shortdesc";
import { SimpleTableNode } from "./nodes/simple-table";
import { StEntryNode } from "./nodes/stentry";
import { StHeadNode } from "./nodes/sthead";
import { StrongNode } from "./nodes/strong";
import { StRowNode } from "./nodes/strow";
import { SubscriptNode } from "./nodes/subscript";
import { SuperscriptNode } from "./nodes/superscript";
import { TitleNode } from "./nodes/title";
import { TopicNode } from "./nodes/topic";
import { TopicmetaNode } from "./nodes/topicmeta";
import { TopicrefNode } from "./nodes/topicref";
import { TtNode } from "./nodes/tt";
import { UlNode } from "./nodes/ul"
import { UnderlinedNode } from "./nodes/underlined";
import { VideoNode } from "./nodes/video";
import { VideoPosterNode } from "./nodes/video-poster";
import { XRefNode } from "./nodes/xref";

/**
 * getNodeClass - Get the Node class constructor based on the node type
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
    case 'div': return DivNode;
    case 'dl': return DlNode;
    case 'dlentry': return DlEntryNode;
    case 'dt': return DtNode;
    case 'em': return EmNode;
    case 'example': return ExampleNode;
    case 'fallback': return FallbackNode;
    case 'fig': return FigNode;
    case 'fn': return FnNode;
    case 'i': return ItalicNode;
    case 'image': return ImageNode;
    case 'keydef': return KeydefNode;
    case 'keytext': return KeytextNode;
    case 'map': return MapNode;
    case 'media-autoplay': return MediaAutoplayNode;
    case 'media-controls': return MediaControlsNode;
    case 'media-loop': return MediaLoopNode;
    case 'media-muted': return MediaMutedNode;
    case 'media-source': return MediaSourceNode;
    case 'media-track': return MediaTrackNode;
    case 'metadata': return MetadataNode;
    case 'li': return LiNode;
    case 'navtitle': return NavtitleNode;
    case 'note': return NoteNode;
    case 'ol': return OlNode;
    case 'othermeta': return OthermetaNode;
    case 'p': return PNode;
    case 'ph': return PhNode;
    case 'pre': return PreNode;
    case 'prolog': return PrologNode;
    case 'section': return SectionNode;
    case 'simpletable': return SimpleTableNode;
    case 'shortdesc': return ShortDescNode;
    case 'stentry': return StEntryNode;
    case 'sthead': return StHeadNode;
    case 'strong': return StrongNode;
    case 'strow': return StRowNode;
    case 'sub': return SubscriptNode;
    case 'sup': return SuperscriptNode;
    case 'title': return TitleNode;
    case 'topic': return TopicNode;
    case 'topicmeta': return TopicmetaNode;
    case 'topicref': return TopicrefNode;
    case 'tt': return TtNode;
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
export function getNodeClassType(name: string): typeof AbstractBaseNode {
  return getNodeClass(name) as unknown as typeof AbstractBaseNode;
}
