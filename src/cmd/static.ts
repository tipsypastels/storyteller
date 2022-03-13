import { type Cmd } from "./mod.ts";
import { type CmdIntr } from "../api/intr/cmd.ts";
import { json } from "https://deno.land/x/sift@0.4.3/mod.ts";

/**
 * Executes static commands, which are predefined global commands.
 *
 * @returns a command response, or `null` if no command matched.
 */
export function exec_static_command(intr: CmdIntr): Promise<Response | null> {
  const cmd = STATIC_COMMANDS[intr.command_name];
  return cmd?.({ intr });
}

const status: Cmd = async () => {
  return json({ type: 4, data: { content: "hello, world!" } });
};

const STATIC_COMMANDS: Record<string, Cmd> = {
  status,
};
