import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kinari: "var(--c-kinari)",
        "kinari-deep": "var(--c-kinari-deep)",
        washi: "var(--c-washi)",
        fukamidori: "var(--c-fukamidori)",
        "fukamidori-dark": "var(--c-fukamidori-dark)",
        miso: "var(--c-miso)",
        "miso-light": "var(--c-miso-light)",
        akamiso: "var(--c-akamiso)",
        "akamiso-dark": "var(--c-akamiso-dark)",
        sumi: "var(--c-sumi)",
        "sumi-soft": "var(--c-sumi-soft)",
        koshu: "var(--c-koshu)",
        kome: "var(--c-kome)",
        kinzanji: "var(--c-kinzanji)",
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
export default config;
