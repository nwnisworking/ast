/**
 * The character for NEW_LINE is \n
 */
export const NEW_LINE = 1 << 0
/**
 * The character for OPEN_TAG is [
 */
export const OPEN_TAG = 1 << 1
/**
 * The character for CLOSE_TAG is ]
 */
export const CLOSE_TAG = 1 << 2
/**
 * The character for END_TAG is :
 */
export const END_TAG = 1 << 3
/**
 * The character for EQUALS is =
 */
export const EQUALS = 1 << 4
/**
 * WORD is used for concatenating words together
 */
export const WORD = 1 << 5
/**
 * TAG_NAME is part of WORD but normally used inside a tag. It starts after the OPEN_TAG
 */
export const TAG_NAME = 1 << 6 | WORD | OPEN_TAG
/**
 * KEY is part of WORD but normally used inside a tag
 */
export const KEY = 1 << 7 | WORD | TAG_NAME
/**
 * VALUE is part of WORD but normally used inside tag
 */
export const VALUE = 1 << 8 | WORD | KEY
/**
 * START indicates a start tag
 */
export const START = OPEN_TAG | CLOSE_TAG
/**
 * END indicates the end of tag
 */
export const END = OPEN_TAG | END_TAG | CLOSE_TAG

export const QUOTE = 1 << 9
export const DBL_QUOTE = 1 << 10