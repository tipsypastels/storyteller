import { json, serve } from "https://deno.land/x/sift@0.4.3/mod.ts";
import { verify_intr_request } from "./api/sig.ts";
import { new_intr_wrapper } from "./api/intr/mod.ts";
import { exec_static_command } from "./cmd/static.ts";

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

  const intr = new_intr_wrapper(body);

  if (intr.is_command()) {
    const static_response = await exec_static_command(intr);
    if (static_response) {
      return static_response;
    }
  }

  return json({ error: "Bad request" }, { status: 400 });
}
