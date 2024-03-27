import { BasicValue, OrArray, ChildTypes, ChildType} from "./classes";
import fs from 'fs';
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
 * @param nodeGroups - Node groups
 * @returns - string
 */
export function childTypeToString(type: ChildType, nodeGroups: Record<string, string[]>, getNodeName?: (nodeName: string) => string): string {
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
 * @param nodeGroups - Node groups
 * @param getNodeName - function to get the node name
 * @param topLevel - start of the document
 * @returns string - Serialized ChildType Array
 */
export function customChildTypesToString(type: ChildTypes, nodeGroups: Record<string, string[]>, getNodeName?: (nodeName: string) => string, topLevel = true): string {
    if (Array.isArray(type)) {
        const types = type.map(subType => customChildTypesToString(subType, nodeGroups, getNodeName, false)).join('|');
        return topLevel || type.length === 1 ? types : '(' + types + ')';
    } else {
        return childTypeToString(type, nodeGroups, getNodeName)
    }
}

/**
 * childTypesToString - Serialize a child type object to a string
 *
 * @param type - ChildType Array
 * @param nodeGroups - Node groups
 * @param topLevel - start of the document
 * @returns string - Serialized ChildType Array
 */
export function childTypesToString(type: ChildTypes, nodeGroups: Record<string, string[]>, topLevel = true): string {
    return customChildTypesToString(type, nodeGroups, undefined, topLevel);
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
 * @returns Array of ChildType objects , @see {@link ChildType}
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
 * @param nodeGroups - Node groups
 * @returns ChildType | undefined - returns the ChildType oject if it's accepted or undefined if it's not
 */
export function acceptsNodeName(value: string, childType: ChildTypes, nodeGroups: Record<string, string[]>): ChildType | undefined {
    // if child type is an array
    if (Array.isArray(childType)) {
        let result: ChildType | undefined;
        childType.some(type => {
            // if any of the children in the array accepts the node name then return true
            result = acceptsNodeName(value, type, nodeGroups);
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
    // if it's an Array
    if (Array.isArray(childType)) {
        let result = true;
        // if one of the children in the array is required then return true
        childType.some(type => {
            result = !isChildTypeRequired(type);
            //console.log("result Array - check if one item is required:", childType, !result);
            return !result;
        });
        //console.log("result Array", childType, result);
        return result;
    } else {
        if (typeof childType === 'string') {
            // if it's a string parse it and check if it's required
            return isChildTypeRequired(stringToChildTypes(childType));
        }
        // if the oject is already parsed then return the required property
        //console.log("result childType property=", childType, !!childType.required);
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

/**
 * Store Xml documents in the file system.
 *
 * @privateRemarks
 * TODO: Get file name info from input XML
 * TODO: Check if the parser has support for reading the XML & Doctype Declaration,
 * if it can then, set the values from the XML Declaration and the Doctype Declaration
 * as properties on the root node of the AST tree.
 *
 * @param xml - The xml input string to store
 * @param path - The path in the filesystem to store the output stream
 */
export function storeOutputXML(xml: string, path: string): void {
    // This is a static & generic XML & DOCTYPE Declaration for the output XML,
    // see above's TODO for a future implementation
    const header = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`
    xml = header + xml;
    fs.writeFileSync(path,xml)
}