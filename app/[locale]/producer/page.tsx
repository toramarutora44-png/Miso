import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
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

export default function ProducerPage({ params }: PageProps) {
  const { locale: rawLocale } = params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const producer = getProducer();
  const p = dict.producer;

  return (
    <>
      <Section tone="kinari" className="text-center">
        <Image
          src={producer.image.src}
          alt={producer.image.alt[locale]}
          width={producer.image.width}
          height={producer.image.height}
          className="mx-auto h-auto w-48 rounded-card border border-miso-light/30 object-cover shadow-paper"
          priority
        />
        <span className="mt-4 inline-block rounded-full border border-fukamidori/40 bg-fukamidori/10 px-3 py-1 text-sm font-medium text-fukamidori-dark">
          {p.experienceBadge}
        </span>
        <h1 className="mt-4 text-[32px] sm:text-[36px]">{dict.producer.title}</h1>
        <p className="mt-2 text-base text-sumi-soft">
          {dict.producer.nameLabel}: {producer.name[locale]}
        </p>
        <p className="mt-4 text-lg">{producer.summary[locale]}</p>
      </Section>

      <Section tone="kinari-deep">
        <h2 className="text-[28px]">{dict.producer.sectionStartTitle}</h2>
        {producer.story.start[locale].map((paragraph, i) => (
          <p key={i} className="mt-3 text-base">
            「{paragraph}」
          </p>
        ))}
      </Section>

      <Section tone="kinari">
        <h2 className="text-[28px]">{dict.producer.sectionCraftTitle}</h2>
        <p className="mt-3 text-base font-medium text-fukamidori-dark">{p.bridgeLine}</p>
        {producer.story.craft[locale].map((paragraph, i) => (
          <p key={i} className="mt-3 text-base">
            「{paragraph}」
          </p>
        ))}
      </Section>

      <Section tone="kinari-deep">
        <h2 className="text-[28px]">{dict.producer.sectionExperienceTitle}</h2>
        {producer.story.experience[locale].map((paragraph, i) => (
          <p key={i} className="mt-3 text-base">
            「{paragraph}」
          </p>
        ))}
        <p className="mt-4 text-right text-base text-sumi-soft">
          {p.signaturePrefix}
          {producer.name[locale]}
        </p>
      </Section>

      <Section tone="kinari">
        <h2 className="text-[28px]">{dict.producer.videoSectionTitle}</h2>
        <div
          className="mx-auto mt-4 w-full max-w-xl overflow-hidden rounded-card border border-miso-light/30"
          style={{ aspectRatio: "16 / 9" }}
        >
          <iframe
            src="https://www.youtube-nocookie.com/embed/zg0FtgXugeA"
            title={dict.producer.videoTitle}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </Section>
    </>
  );
}
