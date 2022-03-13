import { Ary } from "../../util/array.ts";
import { Component, RawComponent } from "./component.ts";
import { Textbox } from "./text.ts";

/**
 * A builder for component rows.
 */
export class Rows {
  private rows: Row[] = [];

  get touched() {
    return this.rows.length > 0;
  }

  get raw(): RawRow[] {
    return this.rows.map((x) => x.raw);
  }

  row(cb: (row: Row) => void) {
    const row = new Row();
    cb(row);
    this.rows.push(row);

    return this;
  }
}

/**
 * A Discord API row.
 */
export interface RawRow {
  type: 1;
  components: RawComponent[];
}

/**
 * A builder for a component row.
 */
export class Row implements Component {
  private _components: Component[] = [];

  get raw(): RawRow {
    return {
      type: 1,
      components: this._components.map((x) => x.raw),
    };
  }

  textbox(label: string, cb: (textbox: Textbox) => void) {
    return this.add(Textbox, cb, [label]);
  }

  private add<T extends Component, P extends Ary>(
    ctor: new (...args: P) => T,
    cb: (t: T) => void,
    args: P
  ) {
    const component = new ctor(...args);
    cb(component);
    this._components.push(component);

    return this;
  }
}
