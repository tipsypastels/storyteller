import { type AnyCmd } from "./mod.ts";
import { CmdIntr } from "../api/intr/cmd.ts";
import { PoolClient } from "../db.ts";
import { resolve_chat_cmd_args } from "./types/chat/mod.ts";

/**
 * Executes a command based on the interaction.
 */
export async function exec_command(
  intr: CmdIntr,
  conn: PoolClient,
  cmd: AnyCmd
) {
  if (intr.is_chat_command()) {
    const args = resolve_chat_cmd_args(intr, conn);
    if (args) {
      await cmd(args);
      return args.reply.into_response(4); // TODO: not this
    }
  }
}
