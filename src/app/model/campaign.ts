import { Conn } from "../../db.ts";

/**
 * Representation of a campaign.
 */
export interface Campaign {
  id: bigint;
  name: string;
  active: boolean;
  discord_guild_id: string;
  discord_channel_id: string;
}

/**
 * Returns the campaign for the given guild ID, if any.
 */
export async function fetch_campaign(conn: Conn, guild_id: string) {
  const query = await conn.queryObject`
    SELECT *
    FROM "public"."campaign"
    WHERE "campaign"."discord_guild_id" = ${guild_id}
    LIMIT 1
  `;

  if (query.rowCount === 0) {
    return null;
  }

  return <Campaign>query.rows[0];
}
