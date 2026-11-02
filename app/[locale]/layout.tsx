import type { ReactNode } from "react";
import { Shippori_Mincho, Noto_Sans_JP, Yuji_Syuku } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCta } from "@/components/layout/StickyCta";
import { locales, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/types/i18n";

const shipporiMincho = Shippori_Mincho({
  // 注: このフォントファミリーはnext/font/google(現行バージョン)では
  // subsetsに "latin" | "latin-ext" のみが有効で、"japanese" という選択肢自体が存在しない。
  // Shippori Mincho/Noto Sans JPはCJK専用フォントのため、日本語グリフは
  // subsets指定に関わらず常に含まれる(subsetsは追加の非日本語レンジの制御用)。
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-shippori-mincho",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

// 筆文字風の見出し・引用専用フォント(キャッチコピー等、短いdisplayテキストのみに使用)。
const yujiSyuku = Yuji_Syuku({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yuji-syuku",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${shipporiMincho.variable} ${notoSansJP.variable} ${yujiSyuku.variable}`}
    >
      <body className="flex min-h-screen flex-col pb-[calc(56px+env(safe-area-inset-bottom))] antialiased">
        <Header locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} />
        <StickyCta locale={locale} dict={dict} />
      </body>
    </html>
  );
}
