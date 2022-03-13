import { type AnyCmd } from "../../../cmd/mod.ts";
import { type CmdIntr } from "../../../api/intr/cmd.ts";
import { status } from "./status.ts";

/**
 * Resolves an interaction into a static command function.
 */
export function resolve_static_command(intr: CmdIntr): AnyCmd | null {
  return STATIC_COMMANDS[intr.command_name] ?? null;
}

const STATIC_COMMANDS: Record<string, AnyCmd> = {
  status,
};
