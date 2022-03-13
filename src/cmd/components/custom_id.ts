import { Handler } from "./component.ts";

import { v4 } from "https://deno.land/std@0.129.0/uuid/mod.ts";
const ACTIVE_CUSTOM_IDS = new Map<string, Handler>();

export function custom_id() {
  return v4.generate();
}

export function remember_custom_id(id: string, handler: Handler) {
  ACTIVE_CUSTOM_IDS.set(id, handler);
}
