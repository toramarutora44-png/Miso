// マイグレーション実行スクリプト。
// 使い方: node scripts/migrate.mjs
// .env.local から POSTGRES_URL を読み込み、migrations/*.sql を順番に実行する。
import fs from "node:fs";
import path from "node:path";
import pg from "pg";

const { Pool } = pg;

function loadDotEnvLocal() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

async function main() {
  loadDotEnvLocal();
  const rawUrl = process.env.POSTGRES_URL;
  if (!rawUrl) {
    throw new Error("POSTGRES_URL が見つかりません (.env.local を確認してください)");
  }
  // pg は connectionString 内の `sslmode` を ssl オプションより優先して
  // 上書きするため、クエリ文字列を除去して明示的な ssl 設定を使う。
  const connectionString = rawUrl.split("?")[0];

  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false }, max: 1 });

  const migrationsDir = path.resolve(process.cwd(), "migrations");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  try {
    for (const file of files) {
      const full = path.join(migrationsDir, file);
      const content = fs.readFileSync(full, "utf8");
      console.log(`Running migration: ${file}`);
      await pool.query(content);
      console.log(`Done: ${file}`);
    }
    console.log("All migrations applied.");
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
