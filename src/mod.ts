import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.4.0/mod.ts";
import nacl from "https://cdn.skypack.dev/tweetnacl@v1.0.3?dts";

serve({
  "/": home,
});

async function home(request: Request) {
  const { error } = await validateRequest(request, {
    POST: {
      headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"],
    },
  });
  if (error) {
    return json({ error: error.message }, { status: error.status });
  }

  const { valid, body } = await verifySignature(request);
  if (!valid) {
    return json(
      { error: "Invalid request" },
      {
        status: 401,
      }
    );
  }

  const { type = 0, data = { options: [] } } = JSON.parse(body);
  if (type === 1) {
    return json({
      type: 1,
    });
  }

  if (type === 2) {
    return json({
      type: 4,
      data: {
        content: `Hello, world!`,
      },
    });
  }

  return json({ error: "bad request" }, { status: 400 });
}

async function verifySignature(
  request: Request
): Promise<{ valid: boolean; body: string }> {
  const PUBLIC_KEY = Deno.env.get("DISCORD_PUBLIC_KEY")!;
  const signature = request.headers.get("X-Signature-Ed25519")!;
  const timestamp = request.headers.get("X-Signature-Timestamp")!;
  const body = await request.text();
  const valid = nacl.sign.detached.verify(
    new TextEncoder().encode(timestamp + body),
    hexToUint8Array(signature),
    hexToUint8Array(PUBLIC_KEY)
  );

  return { valid, body };
}

function hexToUint8Array(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)));
}
