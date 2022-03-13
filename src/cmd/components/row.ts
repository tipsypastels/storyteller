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

  row(): Row {
    const row = new Row();
    this.rows.push(row);
    return row;
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

  textbox() {
    return this.add(Textbox);
  }

  private add<T extends Component>(ctor: new () => T) {
    const component = new ctor();
    this._components.push(component);
    return component;
  }
}
