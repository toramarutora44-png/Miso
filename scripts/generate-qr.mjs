// QRコード生成スクリプト。
// 使い方: node scripts/generate-qr.mjs
// /q/{code} 形式のURLを指すQRコード(誤り訂正レベルH・丸角白背景+深緑枠・
// 中央に商品名ラベル)を生成し、jsqrでデコード検証してから
// C:\Users\yuhi-\Desktop\ に保存する。
import fs from "node:fs";
import path from "node:path";
import QRCode from "qrcode";
import sharp from "sharp";
import jsQR from "jsqr";

const BASE_URL = "https://miso-puce.vercel.app";
const DESKTOP_DIR = "C:\\Users\\yuhi-\\Desktop";

const TARGETS = [
  { code: "QXaXC", label: "甲州みそ", file: "koshu-miso-qr.png" },
  { code: "T2qjP", label: "米みそ", file: "rice-miso-qr.png" },
  { code: "7WZLZ", label: "金山寺みそ", file: "kinzanji-miso-qr.png" },
];

const CANVAS_SIZE = 1000;
const OUTER_RADIUS = 56;
const BORDER_WIDTH = 10;
const BORDER_COLOR = "#2C4435"; // 深緑 (--c-fukamidori-dark相当)
const QUIET_PADDING = 64; // 白背景の端からQRまでの余白
const LABEL_BOX_RATIO = 0.28; // 中央ラベル枠は全体の28%幅
const LABEL_BOX_PADDING = 14; // ラベル枠の内側padding

function extractQrInner(svg) {
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 1 1";
  const innerMatch = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  const inner = innerMatch ? innerMatch[1] : "";
  return { viewBox, inner };
}

function buildCompositeSvg({ qrSvg, label }) {
  const { viewBox, inner } = extractQrInner(qrSvg);
  const qrSize = CANVAS_SIZE - QUIET_PADDING * 2;
  const qrOffset = QUIET_PADDING;

  const labelBoxSize = CANVAS_SIZE * LABEL_BOX_RATIO;
  const labelBoxX = (CANVAS_SIZE - labelBoxSize) / 2;
  const labelBoxY = (CANVAS_SIZE - labelBoxSize) / 2;

  const innerTextWidth = labelBoxSize - LABEL_BOX_PADDING * 2;
  const charCount = Math.max(label.length, 1);
  // 内側幅を文字数で割って自動調整し、枠からはみ出さないようにする
  // (CJKの実測字幅は概ね1emよりやや狭いため0.95倍で安全マージンを確保)
  const fontSizeByWidth = (innerTextWidth / charCount) * 0.95;
  const fontSize = Math.min(fontSizeByWidth, labelBoxSize * 0.22);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" viewBox="0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}">
  <rect x="0" y="0" width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" rx="${OUTER_RADIUS}" fill="#ffffff" />
  <rect x="${BORDER_WIDTH / 2}" y="${BORDER_WIDTH / 2}" width="${CANVAS_SIZE - BORDER_WIDTH}" height="${CANVAS_SIZE - BORDER_WIDTH}" rx="${OUTER_RADIUS - BORDER_WIDTH / 2}" fill="none" stroke="${BORDER_COLOR}" stroke-width="${BORDER_WIDTH}" />
  <svg x="${qrOffset}" y="${qrOffset}" width="${qrSize}" height="${qrSize}" viewBox="${viewBox}">${inner}</svg>
  <rect x="${labelBoxX}" y="${labelBoxY}" width="${labelBoxSize}" height="${labelBoxSize}" rx="12" fill="#ffffff" stroke="${BORDER_COLOR}" stroke-width="4" />
  <text x="${CANVAS_SIZE / 2}" y="${CANVAS_SIZE / 2}" font-size="${fontSize}" font-family="'Hiragino Sans', 'Yu Gothic', 'Noto Sans JP', sans-serif" font-weight="700" fill="${BORDER_COLOR}" text-anchor="middle" dominant-baseline="central">${label}</text>
</svg>`;
}

async function generateOne({ code, label, file }) {
  const url = `${BASE_URL}/q/${code}`;
  const qrSvg = await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 0,
  });

  const compositeSvg = buildCompositeSvg({ qrSvg, label });
  const pngBuffer = await sharp(Buffer.from(compositeSvg)).png().toBuffer();

  // デコード検証(jsqr)
  const { data, info } = await sharp(pngBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const decoded = jsQR(new Uint8ClampedArray(data), info.width, info.height);

  if (!decoded) {
    throw new Error(`[${file}] QRコードのデコードに失敗しました`);
  }
  if (decoded.data !== url) {
    throw new Error(
      `[${file}] デコード結果が一致しません: expected=${url} actual=${decoded.data}`,
    );
  }

  const outPath = path.join(DESKTOP_DIR, file);
  fs.writeFileSync(outPath, pngBuffer);
  console.log(`OK: ${file} -> ${url} (decoded verified)`);
}

async function main() {
  for (const target of TARGETS) {
    await generateOne(target);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
