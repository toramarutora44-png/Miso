import { Pool } from "pg";

/**
 * Supabase(Postgres)への接続。
 * サーバーレス環境での接続過多を避けるため、connection pooling対応の
 * POSTGRES_URL (Vercel Marketplace経由でPgBouncer等を通る想定) を優先する。
 * モジュールスコープでシングルトン化し、関数呼び出しごとの再接続を避ける。
 *
 * クライアントは `pg`(CommonJS)を使用する。`postgres`パッケージ(ESM専用)は
 * Next.jsのwebpackビルドでTerserによるパースエラーを起こすため採用しなかった
 * (既存の next.config.mjs に手を入れず回避するための選択)。
 * 呼び出し側の記述を変えずに済むよう、タグ付きテンプレートの薄いラッパーを提供する。
 */
declare global {
  // eslint-disable-next-line no-var
  var __misoPool: Pool | undefined;
}

function createPool(): Pool {
  const rawUrl = process.env.POSTGRES_URL;
  if (!rawUrl) {
    throw new Error("POSTGRES_URL が設定されていません");
  }
  // pg は connectionString 内の `sslmode` パラメータを ssl オプションより
  // 優先して上書きしてしまう(pg-connection-stringの既知の挙動)ため、
  // クエリ文字列を除去して明示的な ssl 設定を優先させる。
  const connectionString = rawUrl.split("?")[0];
  return new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 1,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 10_000,
  });
}

const pool = globalThis.__misoPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalThis.__misoPool = pool;
}

async function run<T>(text: string, values: unknown[]): Promise<T[]> {
  const result = await pool.query(text, values);
  return result.rows as T[];
}

export interface SqlTag {
  <T = unknown>(strings: TemplateStringsArray, ...values: unknown[]): Promise<T[]>;
  /** 複数ステートメントを含む生SQLを実行する(マイグレーション用)。 */
  unsafe<T = unknown>(text: string): Promise<T[]>;
  end(options?: { timeout?: number }): Promise<void>;
}

function sqlTemplate<T = unknown>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T[]> {
  let text = strings[0];
  for (let i = 0; i < values.length; i++) {
    text += `$${i + 1}${strings[i + 1]}`;
  }
  return run<T>(text, values);
}

sqlTemplate.unsafe = async function unsafe<T = unknown>(text: string): Promise<T[]> {
  // 値を渡さない(simple query protocol)ことで、複数ステートメントの
  // セミコロン区切りSQLを一括実行できる。
  const result = await pool.query(text);
  return result.rows as T[];
};

sqlTemplate.end = async function end(): Promise<void> {
  await pool.end();
};

export const sql = sqlTemplate as SqlTag;
