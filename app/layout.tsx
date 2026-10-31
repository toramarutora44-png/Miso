import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "みそ工房の郷",
  description: "山梨県「みそ工房の郷」の商品紹介サイト",
};

/**
 * 最小ルートレイアウト。
 * <html>/<body> は app/[locale]/layout.tsx 側でロケールごとに出力する
 * (このアプリの実際のページは全て /[locale] 配下にあり、
 *  middleware によってロケール無しパスは /ja へリダイレクトされるため)。
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
