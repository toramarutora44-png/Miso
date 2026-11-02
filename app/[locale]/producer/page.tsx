import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { BrushRule } from "@/components/ui/BrushRule";
import { highlightKeywords } from "@/components/ui/BrushKeyword";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale, locales } from "@/lib/i18n/config";
import { getProducer } from "@/lib/repositories/productRepository";
import type { Locale } from "@/types/i18n";

/**
 * 本文中で筆書き風に強調するキーワード(段落インデックス対応)。
 * データ(producer.story.*)の文章自体は変更せず、表示側でのみ強調する。
 */
const START_KEYWORDS = [["感動、衝撃"], ["おいしさ+安心+安全"]];
const CRAFT_KEYWORDS = [["ただの主婦が始めたみそ屋"], ["家族に食べさせれるもの、喜んでもらえるもの"]];
const EXPERIENCE_KEYWORDS = [["責任を持って"]];

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
          className="mx-auto h-auto w-56 rounded-2xl border border-miso-light/30 object-cover shadow-paper"
          priority
        />
        <span className="mt-4 inline-block rounded-full border border-fukamidori/40 bg-fukamidori/10 px-3 py-1 text-sm font-medium text-fukamidori-dark">
          {p.experienceBadge}
        </span>
        <h1 className="t-display mt-4 text-sumi">{dict.producer.title}</h1>
        <BrushRule className="mx-auto mt-2" width={140} />
        <p className="mt-4 text-base text-sumi-soft">
          {dict.producer.nameLabel}: {producer.name[locale]}
        </p>
        <p className="t-lead mt-4 text-sumi">{producer.summary[locale]}</p>
      </Section>

      <Section tone="kinari-deep">
        <h2 className="t-title text-sumi">{dict.producer.sectionStartTitle}</h2>
        <div className="mt-4 flex flex-col gap-4 border-l-2 border-miso pl-4">
          {producer.story.start[locale].map((paragraph, i) => (
            <p key={i} className="font-heading text-base leading-relaxed text-sumi">
              {highlightKeywords(paragraph, START_KEYWORDS[i] ?? [])}
            </p>
          ))}
        </div>
      </Section>

      <Section tone="kinari">
        <h2 className="t-title text-sumi">{dict.producer.sectionCraftTitle}</h2>
        <p className="t-quote mt-3 text-fukamidori-dark">{p.bridgeLine}</p>
        <div className="mt-4 flex flex-col gap-4 border-l-2 border-miso pl-4">
          {producer.story.craft[locale].map((paragraph, i) => (
            <p key={i} className="font-heading text-base leading-relaxed text-sumi">
              {highlightKeywords(paragraph, CRAFT_KEYWORDS[i] ?? [])}
            </p>
          ))}
        </div>
      </Section>

      <Section tone="kinari-deep">
        <h2 className="t-title text-sumi">{dict.producer.sectionExperienceTitle}</h2>
        <div className="mt-4 flex flex-col gap-4 border-l-2 border-miso pl-4">
          {producer.story.experience[locale].map((paragraph, i) => (
            <p key={i} className="font-heading text-base leading-relaxed text-sumi">
              {highlightKeywords(paragraph, EXPERIENCE_KEYWORDS[i] ?? [])}
            </p>
          ))}
        </div>
        <p className="mt-4 text-right text-base text-sumi-soft">
          {p.signaturePrefix}
          {producer.name[locale]}
        </p>
      </Section>

      <Section tone="kinari">
        <h2 className="t-title text-sumi">{p.soybeanSectionTitle}</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <figure className="sm:col-span-2">
            <Image
              src="/images/farm/farmer-with-soybeans.jpg"
              alt={p.farmerCaption}
              width={1200}
              height={901}
              className="h-auto w-full rounded-card border border-miso-light/30 object-cover shadow-paper"
            />
            <figcaption className="mt-2 text-center text-sm text-sumi-soft">
              {p.farmerCaption}
            </figcaption>
          </figure>
          <Image
            src="/images/farm/aomame-pods-fuji.jpg"
            alt={p.aomamePodsAlt}
            width={900}
            height={1199}
            className="h-auto w-full rounded-card border border-miso-light/30 object-cover shadow-paper"
          />
          <Image
            src="/images/farm/aomame-bowl.jpg"
            alt={p.aomameBowlAlt}
            width={400}
            height={400}
            className="h-auto w-full rounded-card border border-miso-light/30 object-cover shadow-paper"
          />
        </div>
        <p className="mt-4 text-base text-sumi-soft">
          {highlightKeywords(p.soybeanBody1, ["無農薬の青大豆"])}
        </p>
        <p className="mt-2 text-base text-sumi-soft">
          {highlightKeywords(p.soybeanBody2, ["甘みの強い味わい"])}
        </p>
      </Section>

      <Section tone="kinari-deep">
        <h2 className="t-title text-sumi">{p.craftSectionTitle}</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <figure>
            <Image
              src="/images/process/aomame-soaking.jpg"
              alt={p.soakingAlt}
              width={900}
              height={1125}
              className="h-auto w-full rounded-card border border-miso-light/30 object-cover shadow-paper"
            />
            <figcaption className="mt-2 text-center text-sm text-sumi-soft">{p.stepSoaking}</figcaption>
          </figure>
          <figure>
            <Image
              src="/images/process/boiling-01.jpg"
              alt={p.boilingAlt}
              width={1000}
              height={1000}
              className="h-auto w-full rounded-card border border-miso-light/30 object-cover shadow-paper"
            />
            <figcaption className="mt-2 text-center text-sm text-sumi-soft">{p.stepBoiling}</figcaption>
          </figure>
          <figure>
            <Image
              src="/images/process/jigama.jpg"
              alt={p.jigamaAlt}
              width={600}
              height={600}
              className="h-auto w-full max-w-[160px] rounded-card border border-miso-light/30 object-cover shadow-paper sm:max-w-none"
            />
            <figcaption className="mt-2 text-center text-sm text-sumi-soft">{p.stepJigama}</figcaption>
          </figure>
        </div>
        <p className="mt-4 text-base text-sumi-soft">{p.craftBody1}</p>
        <p className="mt-2 text-base text-sumi-soft">{p.craftBody2}</p>
        <p className="mt-2 text-base text-sumi-soft">
          {highlightKeywords(p.craftBody3, ["生きた味噌"])}
        </p>
      </Section>

      <Section tone="kinari">
        <h2 className="t-title text-sumi">{p.certSectionTitle}</h2>
        <p className="mt-2 text-base text-sumi-soft">{p.certIntro}</p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Image
            src="/images/certification/yfdc-muslim-friendly-appendix.jpg"
            alt={p.certMuslimAlt}
            width={1000}
            height={1777}
            className="h-auto w-full rounded-card border border-miso-light/30 object-cover shadow-paper"
          />
          <Image
            src="/images/certification/yfdc-vegan-friendly-appendix.jpg"
            alt={p.certVeganAlt}
            width={1000}
            height={1777}
            className="h-auto w-full rounded-card border border-miso-light/30 object-cover shadow-paper"
          />
        </div>
        <p className="mt-4 text-sm text-sumi-soft">{p.certNote}</p>
      </Section>

      <Section tone="kinari-deep">
        <h2 className="t-title text-sumi">{p.shopSectionTitle}</h2>
        <Image
          src="/images/shop/storefront.jpg"
          alt={p.storefrontAlt}
          width={858}
          height={859}
          className="mx-auto h-auto w-full max-w-xs rounded-card border border-miso-light/30 object-cover shadow-paper"
        />
        <dl className="mt-4 flex flex-col gap-3 text-base">
          <div>
            <dt className="text-sumi-soft">{p.addressLabel}</dt>
            <dd className="mt-0.5">{producer.address[locale]}</dd>
          </div>
          <div>
            <dt className="text-sumi-soft">{p.phoneLabel}</dt>
            <dd className="mt-0.5">{producer.phone}</dd>
          </div>
        </dl>
        <p className="mt-4 text-base text-sumi-soft">{dict.home.purchaseInfoText}</p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <LinkButton href={`/${locale}/products`}>{dict.common.viewProducts}</LinkButton>
          <LinkButton href={`/${locale}/experience`} variant="secondary">
            {dict.nav.experience}
          </LinkButton>
        </div>
      </Section>

      <Section tone="kinari">
        <h2 className="t-title text-sumi">{dict.producer.videoSectionTitle}</h2>
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
        <p className="mt-6 text-base">
          <Link
            href={`/${locale}/contact`}
            className="tap-target inline-flex items-center text-fukamidori-dark underline"
          >
            {dict.common.contactLinkLabel}
          </Link>
        </p>
      </Section>
    </>
  );
}
