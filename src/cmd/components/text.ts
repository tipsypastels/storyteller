import { Component } from "./component.ts";
import { custom_id } from "./custom_id.ts";

/**
 * A text input in the Discord API.
 */
export interface RawTextbox {
  type: 4;
  custom_id: string;
  style: number;
  label: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
}

/**
 * Builder for a modal text input.
 */
export class Textbox implements Component {
  readonly type = 4;
  private _raw: Partial<RawTextbox> = {
    type: 4,
    style: TextboxStyle.Short,
    custom_id: custom_id(),
  };

  get raw(): RawTextbox {
    return <RawTextbox>this._raw;
  }

  label(label: string) {
    this._raw.label = label;
    return this;
  }

  multiline() {
    this._raw.style = TextboxStyle.Paragraph;
    return this;
  }

  minimum(min: number) {
    this._raw.min_length = min;
    return this;
  }

  maximum(max: number) {
    this._raw.max_length = max;
    return this;
  }

  optional() {
    this._raw.required = false;
    return this;
  }

  value(value: string) {
    this._raw.value = value;
    return this;
  }

  placeholder(placeholder: string) {
    this._raw.placeholder = placeholder;
    return this;
  }
}

/**
 * Layouts of textbox.
 */
enum TextboxStyle {
  Short = 1,
  Paragraph = 2,
}
