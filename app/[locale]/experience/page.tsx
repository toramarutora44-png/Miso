import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale, locales } from "@/lib/i18n/config";
import { getProducer } from "@/lib/repositories/productRepository";
import type { Locale } from "@/types/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: { locale: string };
}

export default function ExperiencePage({ params }: PageProps) {
  const { locale: rawLocale } = params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const d = dict.experience;
  const producer = getProducer();
  const features = [d.feature1, d.feature2, d.feature3];

  return (
    <Section tone="kinari">
      <h1 className="text-[32px] sm:text-[36px]">{d.title}</h1>
      <p className="mt-2 text-base text-sumi-soft">{d.lead}</p>

      <dl className="mt-6 grid grid-cols-1 gap-4 text-base sm:grid-cols-3">
        <div>
          <dt className="text-sumi-soft">{d.durationLabel}</dt>
          <dd className="mt-1">{d.duration}</dd>
        </div>
        <div>
          <dt className="text-sumi-soft">{d.venueLabel}</dt>
          <dd className="mt-1">
            {d.venueName}({producer.address[locale]})
          </dd>
        </div>
        <div>
          <dt className="text-sumi-soft">{d.periodLabel}</dt>
          <dd className="mt-1">{d.period}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <h2 className="text-[20px]">{d.featuresTitle}</h2>
        <ul className="mt-3 flex flex-col gap-2 text-base">
          {features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-card border border-akamiso/40 bg-washi p-4">
        <h2 className="text-[20px] text-akamiso">{d.applyTitle}</h2>
        <p className="mt-2 text-sm text-akamiso">
          {d.applyNotePrefix}
          {producer.phone}
          {d.applyNoteSuffix}
        </p>
      </div>

      <LinkButton href={`/${locale}/contact`} className="mt-8">
        {d.ctaContact}
      </LinkButton>
    </Section>
  );
}
