/**
 * 簡易ブルートフォース対策。
 * 同一IPで短時間に失敗が続く場合、一定時間ロックする。
 * 1名のみが使う管理画面のため、プロセス内メモリで十分(永続化不要)。
 */

const WINDOW_MS = 10 * 60 * 1000; // 10分
const MAX_ATTEMPTS = 5;

type Entry = { count: number; firstAttemptAt: number };

const attempts = new Map<string, Entry>();

export function isLocked(ip: string): boolean {
  const entry = attempts.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.firstAttemptAt > WINDOW_MS) {
    attempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function recordFailure(ip: string): void {
  const entry = attempts.get(ip);
  if (!entry || Date.now() - entry.firstAttemptAt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAttemptAt: Date.now() });
    return;
  }
  entry.count += 1;
}

export function clearAttempts(ip: string): void {
  attempts.delete(ip);
}
