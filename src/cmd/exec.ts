import { type AnyCmd } from "./mod.ts";
import { CmdIntr } from "../api/intr/cmd.ts";
import { Conn } from "../db.ts";
import { resolve_chat_cmd_args } from "./types/chat/mod.ts";
import { Embed } from "./embed.ts";
import { Reply } from "./reply.ts";
import { is_usage_error } from "./usage_error.ts";

/**
 * Executes a command based on the interaction.
 */
export async function exec_command(intr: CmdIntr, conn: Conn, cmd: AnyCmd) {
  try {
    return await exec_chat_command(intr, conn, cmd);
  } catch (err) {
    return on_error(err);
  }
}

async function exec_chat_command(intr: CmdIntr, conn: Conn, cmd: AnyCmd) {
  if (!intr.is_chat_command()) {
    return null;
  }

  const args = resolve_chat_cmd_args(intr, conn);
  if (!args) {
    return null;
  }

  await cmd(args);
  return args.reply.respond();
}

function on_error(err: unknown): Response {
  console.error(err);

  const embed = new Embed();
  const reply = new Reply(embed);

  if (is_usage_error(err)) {
    reply.ephemeral();
    embed.merge(err.into_embed);
  } else {
    embed.color("error").title("Welp! The command crashed.");
  }

  return reply.respond();
}
