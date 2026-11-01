import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale, locales } from "@/lib/i18n/config";
import { getSiteLinks, getProducer } from "@/lib/repositories/productRepository";
import type { Locale } from "@/types/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: { locale: string };
}

export default function ContactPage({ params }: PageProps) {
  const { locale: rawLocale } = params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const d = dict.contact;
  const links = getSiteLinks();
  const producer = getProducer();
  const contactHref =
    links.contactUrl.value.startsWith("tel:") || links.contactUrl.value.startsWith("mailto:")
      ? links.contactUrl.value
      : `mailto:${links.contactUrl.value}`;

  return (
    <Section tone="kinari">
      <h1 className="text-[32px] sm:text-[36px]">{d.title}</h1>
      <p className="mt-2 text-base text-sumi-soft">{d.lead}</p>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <a
          href={contactHref}
          className="tap-target inline-flex items-center gap-2 text-lg font-medium text-miso underline hover:text-akamiso"
        >
          {producer.phone}
        </a>
      </div>
      <p className="mt-2 text-sm text-sumi-soft">{producer.phoneNote[locale]}</p>
    </Section>
  );
}
