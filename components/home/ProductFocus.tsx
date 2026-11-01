"use client";
import { useEffect } from "react";
import { resolveProductKey } from "@/lib/productQuery";

/**
 * 見た目を持たないクライアント専用コンポーネント。
 * useSearchParams()はNext14でSuspense境界必須になりビルドエラーの原因になるため使わない。
 * searchParams propもページを動的レンダリングに降格させ静的配信を失うため使わない。
 * window.location.search をuseEffect内で読む方式のみを使う。
 */
export function ProductFocus() {
  useEffect(() => {
    const id = resolveProductKey(new URLSearchParams(window.location.search).get("product"));
    if (!id) return;
    const el = document.getElementById(`product-${id}`);
    if (!el) return;
    el.setAttribute("data-focus", "true");
    el.querySelectorAll<HTMLElement>('[data-reveal="pending"]').forEach((n) => {
      n.dataset.reveal = "in";
    });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);
  return null;
}
