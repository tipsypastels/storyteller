import { type CmdIntr } from "../api/intr/cmd.ts";
import { type PoolClient } from "../db.ts";

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
  conn: PoolClient;
}
