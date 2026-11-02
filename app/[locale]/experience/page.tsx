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
      <h1 className="t-display text-sumi">{d.title}</h1>
      <p className="t-lead mt-3 text-sumi-soft">{d.lead}</p>

      <dl className="mt-8 grid grid-cols-1 gap-5 border-t border-rule pt-6 text-base sm:grid-cols-3">
        <div>
          <dt className="t-label text-sumi-faint">{d.durationLabel}</dt>
          <dd className="mt-1.5 font-heading text-lg text-sumi">{d.duration}</dd>
        </div>
        <div>
          <dt className="t-label text-sumi-faint">{d.venueLabel}</dt>
          <dd className="mt-1.5 font-heading text-lg text-sumi">
            {d.venueName}({producer.address[locale]})
          </dd>
        </div>
        <div>
          <dt className="t-label text-sumi-faint">{d.periodLabel}</dt>
          <dd className="mt-1.5 font-heading text-lg text-sumi">{d.period}</dd>
        </div>
      </dl>

      <div className="mt-10">
        <h2 className="t-title text-sumi">{d.featuresTitle}</h2>
        <ul className="mt-4 flex flex-col gap-3 text-base">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-fukamidori"
                aria-hidden="true"
              />
              <span className="text-sumi">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 rounded-card border border-akamiso/40 bg-washi p-5">
        <h2 className="t-title text-akamiso">{d.applyTitle}</h2>
        <p className="mt-2 text-sm text-akamiso">
          {d.applyNotePrefix}
          {producer.email}
          {d.applyNoteMid}
          {producer.phone}
          {d.applyNoteSuffix}
        </p>
      </div>

      <LinkButton href={`/${locale}/contact`} className="mt-8">
        {d.ctaContact}
      </LinkButton>

      <p className="mt-6 text-sm text-sumi-soft">{d.latestInfoNote}</p>
    </Section>
  );
}
