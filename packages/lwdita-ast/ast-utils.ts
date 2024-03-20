/**
 * @remarks
 * When a node is a group we use this list to check if a node name is valid
 */
const phGroup = ['ph', 'b', 'i', 'u', 'sub', 'sup'];
const dataGroup = ['data'];

/**
 * Node groups
 *
 * @remarks
 * Group all similar nodes
 */
export const nodeGroups: Record<string, Array<string>> = {
    'ph': phGroup,
    'data': dataGroup,
    'common-inline': ['text', ...phGroup, 'image', ...dataGroup],
    'all-inline': ['text', ...phGroup, 'image', 'xref', ...dataGroup],
    'simple-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'fn', 'note', ...dataGroup],
    'fn-blocks': ['p', 'ul', 'ol', 'dl', ...dataGroup],
    'all-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'fn', 'note', ...dataGroup],
    'list-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'note', ...dataGroup],
    'fig-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', ...dataGroup],
}