import Image from "next/image";
import { Band } from "@/components/ui/Band";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { ProcessStrip } from "./ProcessStrip";
import { getProducer } from "@/lib/repositories/productRepository";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface ProducerStoryProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * トップページのつくり手ストーリー。
 * 富士山全幅バンド→ポートレート→大引用→本文(きっかけのみ)→製法3枚帯→CTAの順。
 * craft/experienceは/{locale}/producerへの導線に留め、ここでは出さない(長文化回避)。
 */
export function ProducerStory({ locale, dict }: ProducerStoryProps) {
  const producer = getProducer();
  const h = dict.home;
  const p = dict.producer;
  const [paragraph1, paragraph2] = producer.story.start[locale];

  return (
    <Band tone="kinari">
      <Reveal fadeOnly>
        <div className="relative h-[200px] w-full sm:h-[300px]">
          <Image
            src="/images/farm/fuji-landscape.jpg"
            alt=""
            width={1000}
            height={751}
            sizes="100vw"
            className="h-full w-full object-cover object-[center_32%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-kinari" />
        </div>
      </Reveal>

      <div className="px-5 sm:mx-auto sm:max-w-[1100px]">
        <Reveal className="-mt-10">
          <div className="flex items-end gap-4 sm:items-center">
            <Image
              src={producer.image.src}
              alt={producer.image.alt[locale]}
              width={producer.image.width}
              height={producer.image.height}
              sizes="168px"
              className="w-[132px] shrink-0 rounded-2xl object-cover shadow-stack ring-4 ring-washi sm:w-[168px]"
            />
            <div>
              <span className="inline-block rounded-full border border-fukamidori/40 bg-fukamidori/10 px-3 py-1 text-xs font-medium text-fukamidori-dark">
                {h.producerBadge}
              </span>
              <p className="mt-2 font-heading text-[20px] text-sumi">{producer.name[locale]}</p>
              <p className="t-meta">{producer.role[locale]}</p>
            </div>
          </div>
        </Reveal>

        <div className="relative py-10">
          <span
            className="absolute left-0 top-4 font-heading text-[40px] leading-none text-miso"
            aria-hidden="true"
          >
            「
          </span>
          <p className="t-quote pl-10 text-sumi">
            {h.producerQuote}
            <span aria-hidden="true">」</span>
          </p>
        </div>

        <Reveal>
          <div className="max-w-[640px]">
            <p className="t-body text-sumi-soft">{paragraph1}</p>
            <p className="t-body mt-4 text-sumi-soft">{paragraph2}</p>
          </div>
        </Reveal>

        <p className="mt-6 text-right text-base text-sumi-soft">
          {p.signaturePrefix}
          {producer.name[locale]}
        </p>
      </div>

      <Reveal fadeOnly className="mt-14 px-5 sm:mx-auto sm:max-w-[1100px]">
        <ProcessStrip dict={dict} />
      </Reveal>

      <div className="px-5 py-10 text-center sm:mx-auto sm:max-w-[1100px]">
        <LinkButton href={`/${locale}/producer`} variant="secondary">
          {h.producerCta}
        </LinkButton>
      </div>
    </Band>
  );
}
