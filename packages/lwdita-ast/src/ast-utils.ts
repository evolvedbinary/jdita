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

/**
 * @remarks
 * When a node is a group we use this list to check if a node name is valid
 */
const phGroup = ['ph', 'b', 'i', 'u', 'sub', 'sup'];
const dataGroup = ['data', 'cdata'];

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