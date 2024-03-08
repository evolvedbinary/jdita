import { xditaToJson, xditaToJdita } from "./converter";
import { BaseNode, TextNode, TopicNode } from "@jdita/lwdita-ast/nodes";

const xml = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd"><topic id="program-bulbs-to-groups"><title>Programming Light Bulbs to a Lighting Group</title><shortdesc>You can program one or more light bulbs to a lighting group to operate that group with your remote control.</shortdesc><body><p>New Example</p></body></topic>`

/**
 * XML example for testing a conversion
 *
 * @remarks
 * This is the entry point given xml string.
 * The xml needs to be preprocessed to remove all of the white space
 * and new lines from outside of the tags.
 *
 * @example
 * The whitespace needs to be elimited from the XML before processing
 * from e.g.:
 * ```xml
 * <topic>
 *   <title>valid title</title>
 *   <body>
 *     <p>text</p>
 *   </body>
 * </topic>
 * ```
 * to this:
 * ```xml
 * <topic><title>valid title</title><body><<p>text</p></body></topic>
 * ```
 */
xditaToJdita(xml)
  .then(result => {
    (result.children[0] as TopicNode).id = 'new-topic-id';
    (result.children[0] as TopicNode).dir = 'ltr';
    (result.children[0].children[0].children[0] as TextNode).content = 'New document title';
    console.log(JSON.stringify(result.json, null, 2));
  })
  .catch(e => console.log('Failed to convert:', e));