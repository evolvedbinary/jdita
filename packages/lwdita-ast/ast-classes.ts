import { BasicValue } from "@jdita/lwdita-xml/classes";

/**
 * isReferenceContentScope - Checks if a value is a ReferenceContentScope
 *
 * @param value - String
 * @returns - If the value is a ReferenceContentScope
 */
export const isReferenceContentScope = (value?: BasicValue): value is ReferenceContentScope => ['local', 'peer', 'external'].includes(value as string);

/**
 * ReferenceContentScope defines all possible values for the `scope` attribute
 */
export type ReferenceContentScope = 'local' | 'peer' | 'external';

/**
 * TODO(AR) can we further refine these types?
 */
export type ID = string;

/**
 * Id validation function
 */
export const isID = (value?: BasicValue): value is ID => typeof value === 'string';
/**
 * CDATA character data may contains illegal characters that need to be escaped
 */
export type CDATA = string;

/**
 * CDATA validation function
 */
export const isCDATA = (value?: BasicValue): value is CDATA => typeof value === 'string';

/**
 * PCDATA parsed character data
 */
export type PCDATA = string;

/**
 * PCData validation function
 */
export const isPCDATA = (value?: BasicValue): value is PCDATA => typeof value === 'string';

/**
 * NMTOKEN is a string without any spaces
 */
export type NMTOKEN = string;

/**
 * NMTOKEN validation function
 */
export const isNMTOKEN = (value?: BasicValue): value is NMTOKEN => typeof value === 'string';

/**
 * DisplayScale defines all possible values for the `scale` attribute
 */
export type DisplayScale = 50 | 60 | 70 | 80 | 90 | 100 | 110 | 120 | 140 | 160 | 180 | 200;

/**
 * DisplayScale validation function
 */
export const isDisplayScale = (value?: BasicValue): value is DisplayScale => ([50, 60, 70, 80, 90, 100, 110, 120, 140, 160, 180, 200] as BasicValue[]).indexOf(value) > -1;

/**
 * DisplayAlign defines all possible values for the `align` attribute
 */
export type DisplayFrame = 'all' | 'bottom' | 'none' | 'sides' | 'top' | 'topbot';

/**
 * DisplayAlign validation function
 */
export const isDisplayFrame = (value?: BasicValue): value is DisplayFrame => (['all', 'bottom', 'none', 'sides', 'top', 'topbot'] as BasicValue[]).indexOf(value) > -1;

/**
 * DisplayAlign defines all possible values for the `align` attribute
 */
export type DisplayExpanse = 'column' | 'page' | 'spread' | 'textline';

/**
 * DisplayAlign validation function
 */
export const isDisplayExpanse = (value?: BasicValue): value is DisplayExpanse => (['column', 'page', 'spread', 'textline'] as BasicValue[]).indexOf(value) > -1;

/**
 * NoteType defines all possible values for the `type` attribute
 */
export type NoteType = 'caution' | 'warning' | 'danger' | 'trouble' | 'notice' | 'note';

/**
 * NoteType validation function
 */
export const isNoteType = (value?: BasicValue): value is NoteType => (['caution', 'warning', 'danger', 'trouble', 'notice', 'note'] as BasicValue[]).indexOf(value) > -1;

/**
 * Typedef for UnknownNodeError
 */
export class UnknownNodeError extends Error {
  name = 'unknown-node';
}

/**
 * Typedef for UnknownAttributeError
 */
export class UnknownAttributeError extends Error {
  name = 'unknown-attribute';
}

/**
 * Typedef for UnknownChildError
 */
export class WrongAttributeTypeError extends Error {
  name = 'wrong-attribute-type';
}

/**
 * Typedef for UnknownChildError
 */
export class NonAcceptedChildError extends Error {
  name = 'non-accepted-child';
}