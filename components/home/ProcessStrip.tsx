import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface ProcessStripProps {
  dict: Dictionary;
}

interface StripItem {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  heightClass: string;
}

/**
 * 製法3枚(浸漬・煮熟・地釜)の横スクロール帯。
 * process/* はスナップ品質のため全幅バンドには使わず、ここで小さく使う。
 * sm以上は高さを不揃いにして均等3カラム感を崩す。
 * 1(浸漬)→2(煮炊き)→3(地釜)の順を必ず保つこと(「1」が欠けるとユーザーに
 * 番号が飛んで見える、という指摘が過去にあったため)。契約農家の写真は
 * /{locale}/producer 側に既にあるためここには含めない(キャプション重複を避ける)。
 */
export function ProcessStrip({ dict }: ProcessStripProps) {
  const p = dict.producer;
  const items: StripItem[] = [
    {
      src: "/images/process/aomame-soaking.jpg",
      width: 900,
      height: 1125,
      alt: p.soakingAlt,
      caption: p.stepSoaking,
      heightClass: "sm:h-[300px]",
    },
    {
      src: "/images/process/boiling-01.jpg",
      width: 1000,
      height: 1000,
      alt: p.boilingAlt,
      caption: p.stepBoiling,
      heightClass: "sm:h-[240px]",
    },
    {
      src: "/images/process/jigama.jpg",
      width: 600,
      height: 600,
      alt: p.jigamaAlt,
      caption: p.stepJigama,
      heightClass: "sm:h-[280px]",
    },
  ];

  return (
    <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0">
      {items.map((item) => (
        <figure key={item.src} className="w-[72%] shrink-0 snap-start sm:w-full">
          <div
            className={`aspect-[4/5] w-full overflow-hidden rounded sm:aspect-auto ${item.heightClass}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="(min-width: 640px) 33vw, 72vw"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="t-meta mt-2">{item.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
