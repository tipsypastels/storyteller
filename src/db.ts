import * as pg from "https://deno.land/x/postgres@v0.14.0/mod.ts";

const DATABASE_URL = Deno.env.get("DATABASE_URL")!;

export const POOL = new pg.Pool(DATABASE_URL, /* size */ 3, /* lazy */ true);
export type Conn = pg.PoolClient;
