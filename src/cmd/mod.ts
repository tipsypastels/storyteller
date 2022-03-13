import { type CmdIntr } from "../api/intr/cmd.ts";

/**
 * A command function.
 */
export interface Cmd {
  (args: CmdArgs): Promise<Response>;
}

/**
 * The arguments to a command function.
 */
export interface CmdArgs {
  intr: CmdIntr;
}