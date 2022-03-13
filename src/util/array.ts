// deno-lint-ignore-file no-explicit-any

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

/**
 * The most general array type.
 */
export type Ary = readonly any[];

/**
 * The most general mutable array type.
 */
export type MutAry = any[];

/**
 * The type of the first item in an array.
 */
export type Head<T extends Ary> = T[0];

/**
 * The type of all elements in an array after the first.
 */
export type Tail<T extends Ary> = T extends [unknown, ...infer R] ? R : never;
