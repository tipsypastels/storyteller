import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import * as postgres from "https://deno.land/x/postgres@v0.14.0/mod.ts";

const DATABASE_URL = Deno.env.get("DATABASE_URL")!;

const pool = new postgres.Pool(DATABASE_URL, /* size */ 3, /* lazy */ true);

await pool.connect();

console.log("Listening on http://localhost:8000");
serve((_req) => {
  const count = +(localStorage.getItem("count") ?? 0);
  localStorage.setItem("count", `${count + 1}`);

  return new Response(`Hello World! ${count}`, {
    headers: { "content-type": "text/plain" },
  });
});
