import type { LocalizedRich, LocalizedText } from "@/types/i18n";
import type { ImageRef } from "@/types/content";

/**
 * 生産者情報。
 * 氏名・所在地・電話・メール・定休日・想いのメッセージ(story)は磯部様より確認済み。
 * 経歴の長さ(創業年数・代数等)は未確認かつ誇張しないため記載しない
 * (「30年以上」表記は locales/ja.json 側で値を残しつつ非表示運用、磯部様確認待ち)。
 * image は店舗外観(実写真)。人物写真は未確認のため配置しない。
 */
export interface Producer {
  name: LocalizedText;
  role: LocalizedText;
  summary: LocalizedText;
  address: LocalizedText;
  phone: string;
  email: string;
  phoneNote: LocalizedText;
  closedDays: LocalizedText;
  shipping: LocalizedText;
  story: {
    start: LocalizedRich;
    craft: LocalizedRich;
    experience: LocalizedRich;
  };
  image: ImageRef;
}

export const producer: Producer = {
  name: { ja: "磯部 裕子", en: "Yuko Isobe" },
  role: { ja: "店主", en: "Shop Owner" },
  summary: {
    ja: "山梨県笛吹市の「みそ工房の郷」で味噌づくりを続ける、店主・磯部裕子。",
    en: "Yuko Isobe, owner of Miso Kobo no Sato in Fuefuki City, Yamanashi, continuing her craft of miso-making.",
  },
  address: {
    ja: "〒406-0024 山梨県笛吹市石和町川中島3-1",
    en: "3-1 Kawanakajima, Isawa-cho, Fuefuki-shi, Yamanashi 406-0024, Japan",
  },
  phone: "090-3147-2470",
  email: "misokoubounosato@yahoo.co.jp",
  phoneNote: {
    ja: "店主直通の電話です。電話に出られない場合がありますので、その際は折り返しご連絡いたします。",
    en: "This number connects directly to the shop owner. If she is unable to answer, she will call you back.",
  },
  closedDays: {
    ja: "月・火・水(委託納品等のため不在の場合があります)",
    en: "Monday, Tuesday, Wednesday (may also be closed for deliveries or consignment work)",
  },
  shipping: {
    ja: "佐川急便でお届けします(必要に応じてクール便を利用)。離島等への配送については要お問い合わせです。",
    en: "Shipped via Sagawa Express (cool/refrigerated shipping used when needed). For remote islands and similar areas, please contact us to confirm availability.",
  },
  story: {
    start: {
      ja: [
        "市販の味噌で育った私。嫁ぎ先で手作り味噌を食べた時の「感動、衝撃」が大きかった。",
        "食にこだわりもなくいた私だが、家庭を持ちだんだんと意識が変わっていった。家族にはおいしさ+安心+安全なものを食べさせたい、そこに尽きる。",
      ],
      en: [
        "I grew up on store-bought miso, so the shock and excitement I felt the first time I tasted my husband's family's handmade miso left a deep impression on me.",
        "I never used to be particular about food, but as I started my own family, my awareness gradually changed. All I want is to feed my family something delicious, reassuring, and safe — that's really all that matters to me.",
      ],
    },
    craft: {
      ja: [
        "創業〇〇年とか〇代目とか立派な資格や専門の学校で勉強してきたとか、何一つ誇れるものがない、ただの主婦が始めたみそ屋。",
        "「私の想い」全てにおいての基準、目線は、家族に食べさせれるもの、喜んでもらえるもの。これが常に真ん中にあること。",
      ],
      en: [
        "I have nothing grand to point to — no 'founded in such-and-such year,' no 'generation such-and-such,' no impressive qualifications or training at a specialized school. I'm simply a housewife who started a miso shop.",
        "The one standard behind everything I believe in is this: is it something I could feed my own family, something that would make them happy? That is always at the center of my thinking.",
      ],
    },
    experience: {
      ja: [
        "しかし仕事とするならば大事大切なのは「責任を持って」、この気持ちを日々心がけていきます。",
      ],
      en: [
        "But if I am to treat this as a business, what matters most is to carry it out responsibly — and that is the feeling I try to hold onto every day.",
      ],
    },
  },
  image: {
    src: "/images/shop/storefront.jpg",
    alt: {
      ja: "みそ工房の郷 店舗(山梨県笛吹市石和町)",
      en: "[EN TODO] Miso Kobo no Sato storefront (Isawa-cho, Fuefuki City, Yamanashi)",
    },
    width: 858,
    height: 859,
    isPlaceholder: false,
  },
};
