import { BasicValue, OrArray, ChildTypes, ChildType, ReferenceContentScope } from "./classes";

/**
 * has - Check if an array has a value
 *
 * @param array - Array
 * @param value - Value
 * @returns Boolean
 */
export function has<T>(array: Array<T>, value: T): boolean {
    return array.indexOf(value) >= 0;
}

/**
 * isOrUndefined - Check if a value is undefined or not
 *
 * @param check - Function to check the value
 * @param value - Value
 * @returns - Boolean
 */
export function isOrUndefined<T extends BasicValue>(check: (value?: BasicValue) => boolean, value?: BasicValue): value is T {
    return typeof value === 'undefined' || check(value);
}

/**
 * isReferenceContentScope - TODO
 *
 * @param value - TODO
 * @returns - TODO
 */
export const isReferenceContentScope = (value?: BasicValue): value is ReferenceContentScope => has(['local', 'peer', 'external'], value);

/**
 *
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

/**
 * splitTypenames - Converts a string to an array of strings
 * it splits the string by `|`
 * 
 * @privateRemarks
 * This is only used in tests
 * 
 * @param value - string
 * @returns - String[]
 */
export function splitTypenames(value: string): string[] {
    if (value[0] !== '(') {
        return value.split('|');
    }

    // if the string starts with `(` and ends with `)` then remove them
    const last = value.slice(-1);
    return has(['+', '*', '?'], last)
        ? value.slice(1, -2).split('|').map(type => type + last)
        : value.slice(1, -1).split('|');
}

/**
 * childTypeToString - Convert a child type to a string
 * 
 * @param type - ChildType object
 * @param getNodeName - Get node name function
 * @returns - string
 */
function childTypeToString(type: ChildType, getNodeName?: (nodeName: string) => string): string {
    return (type.isGroup
        ? nodeGroups[type.name].length === 1
            ? (getNodeName
                ? nodeGroups[type.name].map(getNodeName)
                : nodeGroups[type.name]
            ).join('|')
            : '(' + (getNodeName
                ? nodeGroups[type.name].map(getNodeName)
                : nodeGroups[type.name]
            ).join('|') + ')'
        : getNodeName ? getNodeName(type.name) : type.name
    ) + (type.single
        ? type.required ? '' : '?'
        : type.required ? '+' : '*');
}

/**
 * customChildTypesToString - Serialize a child type object to a string with a custom function to get the node name
 *
 * @param type - ChildType Array
 * @param getNodeName - function to get the node name
 * @param topLevel - start of the document
 * @returns string - Serialized ChildType Array
 */
export function customChildTypesToString(type: ChildTypes, getNodeName?: (nodeName: string) => string, topLevel = true): string {
    if (Array.isArray(type)) {
        const types = type.map(subType => customChildTypesToString(subType, getNodeName, false)).join('|');
        return topLevel || type.length === 1 ? types : '(' + types + ')';
    } else {
        return childTypeToString(type, getNodeName)
    }
}

/**
 * childTypesToString - Serialize a child type object to a string
 *
 * @param type - ChildType Array
 * @param topLevel - start of the document
 * @returns string - Serialized ChildType Array
 */
export function childTypesToString(type: ChildTypes, topLevel = true): string {
    return customChildTypesToString(type, undefined, topLevel);
}

/**
 * stringToChildTypes - Convert the array list of string to child objects
 * 
 * @remarks
 * `?` - optional
 * `+` - required
 * `*` - optional and multiple
 * `%` - group
 *
 * @param value - String or Array of strings
 * @param topLevel - Entry of the document
 * @returns Array of ChildType objects , @See {@link ChildType}
 */
export function stringToChildTypes(value: OrArray<string>, topLevel = true): ChildTypes[] {
    if (typeof value === 'string') {
        if (value === '') {
            return [];
        }
        if (value.indexOf('|') < 0) {
            const last = value.slice(-1);
            const result: ChildType = has(['+', '*', '?'], last)
            ? {
                name: value.slice(0, -1),
                single: last === '?',
                required: last === '+',
                isGroup: false,
            } : {
                name: value,
                single: true,
                required: true,
                isGroup: false,
            };
            if (result.name[0] === '%') {
                result.name = result.name.substr(1);
                result.isGroup = true;
            }
            return topLevel && !Array.isArray(result) ? [ result ] : result as unknown as ChildTypes[];
        } else {
            return stringToChildTypes(splitTypenames(value), false);
        }
    } else {
        return value.map(subType => stringToChildTypes(subType, false)).filter(type => !Array.isArray(type) || type.length > 0);
    }
}

/**
 * acceptsNodeName - Check whether a child type accepts a node name
 *
 * @param value - Node name
 * @param childType - String or an ChildType object or an array ChildType objects
 * @returns ChildType | undefined - returns the ChildType oject if it's accepted or undefined if it's not
 */
export function acceptsNodeName(value: string, childType: ChildTypes): ChildType | undefined {
    // if child type is an array
    if (Array.isArray(childType)) {
        let result: ChildType | undefined;
        childType.some(type => {
            // if any of the children in the array accepts the node name then return true
            result = acceptsNodeName(value, type);
            if (result) {
                return true;
            }
        });
        return result;
    } else {
        // if child type is not a group
        // then check if the child type name is equal to the value
        // if it's a group check if the value is in the group
        return !childType.isGroup
            ? (childType.name === value ? childType : undefined)
            : (has(nodeGroups[childType.name], value) ? childType : undefined);
    }
}

/**
 * isChildTypeSingle - check if the child belongs to a group of elements eg: `list-blocks` or `all-line`
 *
 *
 * @param childType - String or an ChildType object or an array ChildType objects
 * @returns Boolean - Whether the child is a group or not
 */
export function isChildTypeSingle(childType: string | ChildType | ChildTypes): boolean {
    // if it's an Array 
    if (Array.isArray(childType)) {
        let result = true;
        // if any of the children in the array is not a single type then return false
        childType.some(type => {
            result = isChildTypeSingle(type);
            return !result;
        });
        return result;
    } else {
        // it's a string
        if (typeof childType === 'string') {
            // parse the string using `stringToChildTypes` and check if it's a single type
            // single type can be denoted by the lack of `%` in the beginning of the string
            return isChildTypeSingle(stringToChildTypes(childType));
        }
        // if the oject is already parsed then return the single property
        return !!childType.single;
    }
}

/**
 * isChildTypeRequired - Check if a child is required
 * 
 * the required property is denoted by `+` or the lack of `?` in the end of the string
 * This means the child must be present in the node in the order specified by the parent node
 * 
 * @param childType -  String or an ChildType object or an array ChildType objects
 * @returns Boolean - Whether the child is required or not
 */
export function isChildTypeRequired(childType: string | ChildType | ChildTypes): boolean {
    // console.log(childType);
    // if it's an Array
    if (Array.isArray(childType)) {
        let result = true;
        // if one of the children in the array is required then return true
        childType.some(type => {
            result = !isChildTypeRequired(type);
            return !result;
        });
        return result;
    } else {
        if (typeof childType === 'string') {
            // if it's a string parse it and check if it's required
            return isChildTypeRequired(stringToChildTypes(childType));
        }
        // if the oject is already parsed then return the required property
        return !!childType.required;
    }
}

/**
 * childTypesArray - Check whether the child types is an array or not and return an array
 *
 * @param childTypes - ChildType array or ChildType object
 * @returns - ChildType array
 */
export function childTypesArray(childTypes: ChildTypes): ChildTypes[] {
    return Array.isArray(childTypes) ? childTypes : [childTypes];
}

/**
 * areFieldsValid - Attribute validator
 *
 * @param fields - Array of attribute names
 * @param value - Object of attribute values
 * @param validations - Validation functions
 * @returns Boolean - Whether the attributes are valid or not
 */
export function areFieldsValid(fields: string[], value: Record<string, BasicValue>, ...validations: ((field: string, value: BasicValue) => boolean)[]): boolean {
    for (const field of fields) {
        let valid = false;
        for (const validation of validations) {
            if (validation(field, value[field])) {
                valid = true;
                break;
            }
        }
        if (!valid) {
            return false;
        }
    }
    return true;
}
