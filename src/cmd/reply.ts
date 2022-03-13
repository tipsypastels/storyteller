import { Embed, RawEmbed } from "./embed.ts";
import { json } from "../deps.ts";

/**
 * Representation of an interaction reply in the Discord API.
 */
export interface RawReply {
  content?: string;
  flags?: number;
  embeds?: [RawEmbed];
}

/**
 * Enumeration of reply types.
 */
export enum RawReplyType {
  ChannelMessageWithSource = 4,
  DeferredChannelMessageWithSource = 5,
  DeferredUpdateMessage = 6, // for components only
  UpdateMessage = 7,
  AutocompleteResult = 8,
  Modal = 9,
}

/**
 * Flags associated with a raw reply.
 */
export enum RawReplyFlags {
  Ephemeral = 1 << 6,
}

/**
 * Builder for an interaction reply.
 */
export class Reply {
  private _content?: string;
  private _ephemeral = { on_ok: false, on_err: false };

  constructor(private embed: Embed) {}

  get touched() {
    return this.embed.touched || this.content;
  }

  get is_ephemeral() {
    return this._ephemeral;
  }

  ephemeral() {
    this._ephemeral.on_ok = true;
    return this;
  }

  ephemeral_on_error() {
    this._ephemeral.on_err = true;
    return this;
  }

  content(content: string) {
    this._content = content;
    return this;
  }

  into_response(type: RawReplyType): Response {
    return json({ type, data: this.into_raw() });
  }

  into_raw() {
    const raw: RawReply = {};

    if (this._ephemeral.on_ok) {
      raw.flags = RawReplyFlags.Ephemeral;
    }

    if (this._content) {
      raw.content = this._content;
    }

    if (this.embed.touched) {
      raw.embeds = [this.embed.raw];
    }

    return raw;
  }
}
