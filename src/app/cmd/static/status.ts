import { ChatCmd, CmdTypeChat } from "../../../cmd/types/chat/mod.ts";
import { fetch_campaign } from "../../model/campaign.ts";
import { create_usage_errors } from "../../../cmd/usage_error.ts";

let count = 0;

/**
 * The `/status` static chat command.
 */
export const status: ChatCmd = async ({ intr, conn, embed }) => {
  const campaign = await fetch_campaign(conn, intr.guild_id);
  if (!campaign) throw error("none");

  embed
    .color("ok")
    .title(campaign.name)
    .descr(`${++count}`);
};

status.data = {
  name: "status",
  description: "Shows the status of the campaign.",
  type: CmdTypeChat,
};

const error = create_usage_errors({
  none(e) {
    e.color("danger")
      .title("No campaign exists in this server.")
      .descr("You should be able to start one with `/start`.");
  },
});
