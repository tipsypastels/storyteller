import { ChatCmd, CmdTypeChat } from "../../../cmd/types/chat/mod.ts";
import { fetch_campaign } from "../../model/campaign.ts";

/**
 * The `/status` static chat command.
 */
export const status: ChatCmd = async ({ intr, conn, embed }) => {
  const campaign = (await fetch_campaign(conn, intr.guild_id))!;

  embed.color("ok").title(campaign.name);
};

status.data = {
  name: "status",
  description: "Shows the status of the campaign.",
  type: CmdTypeChat,
};
