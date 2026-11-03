/**
 * 管理者セッショントークンの発行・検証。
 * Edge Runtime(middleware.ts)とNode Runtime(login route等)の両方から
 * 使われるため、Web Crypto API (crypto.subtle) のみに依存する
 * (node:crypto は Edge Runtime で使用不可)。
 *
 * トークン形式: `${expEpochSeconds}.${base64url(HMAC-SHA256)}`
 */

export const ADMIN_SESSION_COOKIE = "admin_session";

const encoder = new TextEncoder();

function toBase64Url(bytes: ArrayBuffer): string {
  const arr = new Uint8Array(bytes);
  let str = "";
  for (let i = 0; i < arr.length; i++) str += String.fromCharCode(arr[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = "===".slice((base64.length + 3) % 4);
  const str = atob(base64 + pad);
  const arr = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) arr[i] = str.charCodeAt(i);
  return arr;
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

const DEFAULT_TTL_SECONDS = 30 * 24 * 60 * 60; // 30日

export async function createSessionToken(
  secret: string,
  ttlSeconds: number = DEFAULT_TTL_SECONDS,
): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const key = await getHmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(String(exp)));
  return `${exp}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
  secret: string,
): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [expPart, sigPart] = parts;
  const exp = Number(expPart);
  if (!Number.isFinite(exp)) return false;
  if (Math.floor(Date.now() / 1000) > exp) return false;

  try {
    const key = await getHmacKey(secret);
    const signature = fromBase64Url(sigPart);
    const signatureBuffer = signature.buffer.slice(
      signature.byteOffset,
      signature.byteOffset + signature.byteLength,
    ) as ArrayBuffer;
    return await crypto.subtle.verify("HMAC", key, signatureBuffer, encoder.encode(expPart));
  } catch {
    return false;
  }
}
