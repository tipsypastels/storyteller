import { Embed, RawEmbed } from "./embed.ts";
import { json } from "../deps.ts";
import { Modal } from "./components/modal.ts";

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
  private _ephemeral = false;
  private _modal?: Modal;

  constructor(private embed: Embed) {}

  get touched() {
    return this.embed.touched || this.content;
  }

  get is_ephemeral() {
    return this._ephemeral;
  }

  ephemeral() {
    this._ephemeral = true;
    return this;
  }

  content(content: string) {
    this._content = content;
    return this;
  }

  modal(title: string) {
    this._modal = new Modal(title);
    return this._modal;
  }

  respond() {
    return this.respond_with_type(this.reply_type());
  }

  respond_with_type(type: RawReplyType): Response {
    return json({ type, data: this.raw(type) });
  }

  private reply_type(): RawReplyType {
    if (this._modal?.touched) {
      return RawReplyType.Modal;
    }

    return RawReplyType.ChannelMessageWithSource;
  }

  private raw(type: RawReplyType) {
    if (this._modal && type === RawReplyType.Modal) {
      return this._modal.raw;
    }

    const raw: RawReply = {};

    if (this._ephemeral) {
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
