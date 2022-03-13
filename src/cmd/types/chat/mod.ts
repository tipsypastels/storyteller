import {
  type Cmd,
  type CmdData,
  type CmdArgs,
  type CmdArgResolver,
  CmdType,
} from "../../mod.ts";
import { type CmdIntr } from "../../../api/intr/cmd.ts";
import { Reply } from "../../reply.ts";
import { Embed } from "../../embed.ts";

/**
 * Alias to `CmdType.Chat` to reduce number of imports.
 */
export const CmdTypeChat = CmdType.Chat;

/**
 * A chat command function.
 */
export interface ChatCmdArgs extends CmdArgs {
  intr: CmdIntr;
}

/**
 * Registration data for a chat command.
 */
interface ChatCmdData extends CmdData {
  type: CmdType.Chat;
}

/**
 * A chat command, also known as a slash command.
 */
export type ChatCmd = Cmd<ChatCmdArgs, ChatCmdData, CmdIntr>;

/**
 * Resolver for chat command arguments.
 */
export type ChatCmdArgResolver = CmdArgResolver<ChatCmdArgs, CmdIntr>;

/**
 * @see ChatCmdArgResolver
 */
export const resolve_chat_cmd_args: ChatCmdArgResolver = (intr, conn) => {
  const embed = new Embed();
  const reply = new Reply(embed);

  return {
    intr,
    conn,
    embed,
    reply,
  };
};
