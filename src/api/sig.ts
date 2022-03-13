import {
  json,
  validateRequest as validate_request,
} from "https://deno.land/x/sift@0.4.3/mod.ts";
import nacl from "https://cdn.skypack.dev/tweetnacl@v1.0.3?dts";

/**
 * The result of verifying the validity of an interaction.
 */
export type VerifyIntr =
  | { ok: true; body_text: string }
  | { ok: false; response: Response };

/**
 * Verifies the signature of an interaction request.
 */
export async function verify_intr_request(
  request: Request
): Promise<VerifyIntr> {
  const { error } = await validate_request(request, {
    POST: {
      headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"],
    },
  });

  if (error) {
    return {
      ok: false,
      response: json({ error: error.message }, { status: error.status }),
    };
  }

  const { valid, body } = await verify_sig(request);

  if (!valid) {
    return {
      ok: false,
      response: json({ error: "Invalid request" }, { status: 401 }),
    };
  }

  return { ok: true, body_text: body };
}

async function verify_sig(
  request: Request
): Promise<{ valid: boolean; body: string }> {
  const PUBLIC_KEY = Deno.env.get("DISCORD_PUBLIC_KEY")!;
  const signature = request.headers.get("X-Signature-Ed25519")!;
  const timestamp = request.headers.get("X-Signature-Timestamp")!;
  const body = await request.text();
  const valid = nacl.sign.detached.verify(
    new TextEncoder().encode(timestamp + body),
    hex_to_bit_array(signature),
    hex_to_bit_array(PUBLIC_KEY)
  );

  return { valid, body };
}

function hex_to_bit_array(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)));
}
