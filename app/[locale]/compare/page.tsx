import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { CompareSimple } from "@/components/compare/CompareSimple";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale, locales } from "@/lib/i18n/config";
import { getAllProducts } from "@/lib/repositories/productRepository";
import type { Locale } from "@/types/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: { locale: string };
}

export default function ComparePage({ params }: PageProps) {
  const { locale: rawLocale } = params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const products = getAllProducts();

  return (
    <Section tone="kinari">
      <h1 className="text-[32px] sm:text-[36px]">{dict.compare.title}</h1>
      <p className="mt-2 text-base text-sumi-soft">{dict.compare.lead}</p>
      <div className="mt-8">
        <CompareSimple products={products} locale={locale} dict={dict} />
      </div>
    </Section>
  );
}
