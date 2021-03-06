import { Ary } from "../util/array.ts";

/**
 * Representation of an embed in the Discord API.
 */
export interface RawEmbed {
  title?: string;
  description?: string;
  color?: number;
}

/**
 * Function that can be merged into an embed, applying
 * changes to it in the process.
 */
export interface IntoEmbed<P extends Ary = []> {
  (embed: Embed, ...args: P): void;
}

/**
 * Builder for an embed object.
 */
export class Embed {
  private _raw: RawEmbed = {};
  private _touched = false;

  get raw() {
    return this._raw;
  }

  get touched() {
    return this._touched;
  }

  merge<P extends Ary>(into: IntoEmbed<P>, ...p: P) {
    into(this, ...p);
    return this;
  }

  title(title: string) {
    return this.edit((raw) => (raw.title = title));
  }

  descr(descr: string) {
    return this.edit((raw) => (raw.description = descr));
  }

  color(color: keyof typeof EMBED_COLORS) {
    return this.color_custom(EMBED_COLORS[color]);
  }

  color_custom(color: number) {
    return this.edit((raw) => (raw.color = color));
  }

  private edit(fn: (raw: RawEmbed) => void) {
    fn(this._raw);
    this._touched = true;

    return this;
  }
}

/**
 * Preset colours to be used with embeds.
 */
export const EMBED_COLORS = {
  ok: 0x7fc13a,
  info: 0x00c17d,
  error: 0xff0041,
  danger: 0xff8931,
  warning: 0xfdbe4a,
};
