import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./admin.css";

export const metadata: Metadata = {
  title: "管理画面 | みそ工房の郷",
  robots: { index: false, follow: false },
};

/**
 * 管理画面専用の完全に独立したルートレイアウト。
 * app/[locale]/layout.tsx のHeader/Footer/フォント設定(next/font等)を
 * 一切継承しない。<html>/<body> もここで独自に出力する。
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
