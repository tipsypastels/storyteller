import { type Cmd, type CmdArgs } from "./mod.ts";
import { json } from "https://deno.land/x/sift@0.4.3/mod.ts";

/**
 * Executes static commands, which are predefined global commands.
 *
 * @returns a command response, or `null` if no command matched.
 */
export function exec_static_command(args: CmdArgs): Promise<Response | null> {
  const cmd = STATIC_COMMANDS[args.intr.command_name];
  return cmd?.(args);
}

const status: Cmd = async ({ intr, conn }) => {
  const data = await conn.queryObject`
    SELECT *
    FROM "public"."campaign"
    WHERE "campaign"."discord_guild_id" = ${intr.guild_id}
    LIMIT 1
  `;

  return json({
    type: 4,
    data: { content: JSON.stringify(data.rows) },
  });
};

const STATIC_COMMANDS: Record<string, Cmd> = {
  status,
};
