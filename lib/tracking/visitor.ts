/**
 * スキャン計測用の匿名化ユーティリティ。
 * 生のIP/UAは保存しない。日次ローテーションする一方向ハッシュのみ保存する。
 */

const encoder = new TextEncoder();

function toHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * visitor_hash = SHA256(ip + ua + YYYY-MM-DD + salt)
 * 日が変わるとハッシュが変わるため、長期的な個人追跡はできない。
 */
export async function hashVisitor(
  ip: string,
  ua: string,
  day: string,
  salt: string,
): Promise<string> {
  const data = encoder.encode(`${ip}|${ua}|${day}|${salt}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(digest);
}

export function classifyUserAgent(ua: string): "mobile" | "desktop" | "bot" {
  const lower = ua.toLowerCase();
  if (/bot|crawler|spider|preview/.test(lower)) return "bot";
  if (/mobile|android|iphone|ipad|ipod/.test(lower)) return "mobile";
  return "desktop";
}

export function isBotUserAgent(ua: string): boolean {
  return /bot|crawler|spider|preview/i.test(ua);
}

export function getClientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0].trim();
  }
  return headers.get("x-real-ip") ?? "unknown";
}

/**
 * 日本時間(Asia/Tokyo)基準の日付文字列を返す。
 * day: YYYY-MM-DD / month: YYYY-MM
 */
export function getJstDayAndMonth(date: Date = new Date()): { day: string; month: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const day = `${map.year}-${map.month}-${map.day}`;
  const month = `${map.year}-${map.month}`;
  return { day, month };
}
