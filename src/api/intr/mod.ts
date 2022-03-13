import { RawCmdIntr, CmdIntr } from "./cmd.ts";

/**
 * An interaction, as delivered by the discord API.
 */
export type RawIntr = RawCmdIntr;

/**
 * An interaction wrapper class.
 */
export type Intr = CmdIntr;

/**
 * Creates an interaction wrapper class for the given raw interaction.
 */
export function new_intr_wrapper(raw: RawIntr): Intr {
  switch (raw.type) {
    case 2:
      return new CmdIntr(raw);
  }
}
