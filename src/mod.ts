import { json, serve } from "./deps.ts";
import { verify_intr_request } from "./api/sig.ts";
import { new_intr_wrapper } from "./api/intr/mod.ts";
import { Conn, POOL } from "./db.ts";
import { resolve_static_command } from "./app/cmd/static/mod.ts.ts";
import { exec_command } from "./cmd/exec.ts";
import { type Intr } from "./api/intr/mod.ts";

serve({
  "/": home,
});

async function home(request: Request) {
  const verified = await verify_intr_request(request);

  if (!verified.ok) {
    return verified.response;
  }

  const { body_text } = verified;
  const body = JSON.parse(body_text);

  if (body.type === /* ping */ 1) {
    return json({ type: 1 });
  }

  const conn = await POOL.connect();

  try {
    const intr = new_intr_wrapper(body);
    const response = await handle_intr(intr, conn);

    if (response) {
      return response;
    }

    return json({ error: "Bad request" }, { status: 400 });
  } finally {
    conn.release();
  }
}

function handle_intr(intr: Intr, conn: Conn) {
  if (!intr.is_command()) {
    return null;
  }

  const cmd = resolve_static_command(intr);
  if (!cmd) {
    return null;
  }

  return exec_command(intr, conn, cmd);
}
