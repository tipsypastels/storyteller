import { Handler, RawComponent } from "./component.ts";
import { custom_id } from "./custom_id.ts";
import { Row, Rows } from "./row.ts";

/**
 * Modals in the Discord API.
 */
export interface RawModal {
  title: string;
  custom_id: string;
  components: RawComponent[];
}

/**
 * A builder for modals.
 */
export class Modal implements Handler {
  private _rows = new Rows();
  private _title = "Prompt";
  private _custom_id = custom_id();

  get touched() {
    return this._title || this._rows.touched;
  }

  get raw(): RawModal {
    return {
      title: this._title,
      custom_id: this._custom_id,
      components: this._rows.raw,
    };
  }

  handle() {
    //
  }

  title(title: string) {
    this._title = title;
    return this;
  }

  row(): Row {
    return this._rows.row();
  }
}
