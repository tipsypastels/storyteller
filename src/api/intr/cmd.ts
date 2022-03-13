/**
 * A command interaction, as delivered by the Discord API.
 */
export interface RawCmdIntr {
  type: 2;
  data: {
    id: string;
    name: string;
    type: number;
  };
  guild_id: string;
}

/**
 * A command interaction wrapper class.
 */
export class CmdIntr {
  constructor(readonly raw: RawCmdIntr) {}

  get type(): 2 {
    return this.raw.type;
  }

  is_command(): this is CmdIntr {
    return this.type === 2;
  }

  is_chat_command() {
    return this.raw.data.type === 1;
  }

  get command_name(): string {
    return this.raw.data.name;
  }

  get guild_id(): string {
    return this.raw.guild_id;
  }
}
