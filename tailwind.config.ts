import type { Config } from "tailwindcss";

/**
 * `var(--c-X)`(16進数カラー)はTailwindの`/NN`不透明度指定を解釈できないため、
 * `--c-X-rgb`(スペース区切りRGB、app/globals.css側で定義済み)を
 * `rgb(var(..) / <alpha-value>)`形式で参照するヘルパー。
 */
function withOpacity(rgbVarName: string) {
  return ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue !== undefined
      ? `rgb(var(${rgbVarName}) / ${opacityValue})`
      : `rgb(var(${rgbVarName}))`;
}

// 注: Tailwindの公式Config型はカラー値に関数を許容しないが、
// 実際のJITエンジンは `({ opacityValue }) => string` 形式の色関数(不透明度対応)を
// サポートしている。型チェックのみ緩め、最終exportはConfig型を維持する。
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kinari: withOpacity("--c-kinari-rgb"),
        "kinari-deep": withOpacity("--c-kinari-deep-rgb"),
        washi: withOpacity("--c-washi-rgb"),
        fukamidori: withOpacity("--c-fukamidori-rgb"),
        "fukamidori-dark": withOpacity("--c-fukamidori-dark-rgb"),
        "fukamidori-deep": withOpacity("--c-fukamidori-deep-rgb"),
        "sumi-faint": withOpacity("--c-sumi-faint-rgb"),
        rule: "var(--c-rule)",
        miso: withOpacity("--c-miso-rgb"),
        "miso-light": withOpacity("--c-miso-light-rgb"),
        akamiso: withOpacity("--c-akamiso-rgb"),
        "akamiso-dark": withOpacity("--c-akamiso-dark-rgb"),
        sumi: withOpacity("--c-sumi-rgb"),
        "sumi-soft": withOpacity("--c-sumi-soft-rgb"),
        koshu: withOpacity("--c-koshu-rgb"),
        kome: withOpacity("--c-kome-rgb"),
        "kome-ink": withOpacity("--c-kome-ink-rgb"),
        kinzanji: withOpacity("--c-kinzanji-rgb"),
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
        card: "8px",
      },
      boxShadow: {
        paper: "0 2px 6px rgba(26,23,20,0.10)",
        stack: "0 1px 2px rgba(26,23,20,0.08), 0 8px 20px rgba(26,23,20,0.12)",
      },
    },
  },
  plugins: [],
};
export default config as unknown as Config;
