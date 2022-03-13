import { Tail } from "../util/array.ts";
import type { Embed, IntoEmbed } from "./embed.ts";

const TAG: unique symbol = Symbol("usage_error");

/**
 * A pre-made error that commands may throw, which can
 * control its own formatting.
 *
 * @internal
 */
export interface UsageError {
  [TAG]: true;
  into_embed: IntoEmbed;
}

/**
 * Is this unknown thrown object a usage error?
 */
export function is_usage_error(err: unknown): err is UsageError {
  return !!(err && typeof err === "object" && TAG in err);
}

/**
 * Creates a function that throws predefined command errors,
 * which can control their own formatting.
 */
export function create_usage_errors<E extends Errors>(errors: E) {
  type Keys = keyof E & string;
  return <C extends Keys>(code: C, ...ctx: Ctx<E, C>): UsageError => {
    const into_embed: IntoEmbed = (e) => e.merge(errors[code], ...ctx);
    return { [TAG]: true, into_embed };
  };
}

type Ctx<E extends Errors, C extends keyof E> = Tail<Parameters<E[C]>>;

interface ErrorFn {
  (embed: Embed, ...params: never[]): void;
}

interface Errors {
  [key: string]: ErrorFn;
}
