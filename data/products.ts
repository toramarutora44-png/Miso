import type { Product } from "@/types/product";

/**
 * 商品の仮データ。
 *
 * 甲州味噌・米味噌の原材料・価格・熟成期間(甲州味噌のみ)は磯部様確認済み(confirmed)。
 * 金山寺味噌は価格のみ確認済みで、原材料配合の詳細(野菜の種類等)は資料未記載のため
 * unverified のまま維持している。
 * taste / tasteNotes は依然として一般的な味噌の知識から推測した仮値(provisional)。
 * vegan / halal は安全側に倒して null(未確認)固定とし、安易に true を入れないこと。
 *
 * TODO(data-verify): 要・磯部様確認 — taste(甘み/塩味/コク/香りの数値)・allergens・
 * dietary・金山寺味噌の原材料配合は未確認のままです。
 */
export const products: Product[] = [
  {
    id: "koshu-miso",
    slug: "koshu-miso",
    order: 1,
    name: { ja: "甲州みそ", en: "[EN TODO] Koshu Miso" },
    catchCopy: {
      ja: "コクと深みのある伝統の味",
      en: "[EN TODO] A traditional taste, rich and deep.",
    },
    body: {
      ja: [
        "赤味噌の力強さと、山梨の風土が育てたコク。",
        "甲州味噌は、麦麹と米糀を合わせた「麦麹・米糀合わせ味噌」です。原材料は大豆・麹(麦麹+米糀)・塩のみ。",
        "大豆には、山梨県富士吉田市(富士山麓)の契約農家専用栽培による無農薬の希少な青大豆を使用。油分が少なく糖度が高いため、甘みの強い味わいが特徴です。",
        "天然醸造・無添加で、発酵を止めていない「生きた味噌」。加熱処理や発酵止めのアルコール添加は行わず、地釜で炊き上げた煮汁(味噌のたまり)を加えて仕込んでいます。",
      ],
      en: [
        "[EN TODO] Koshu Miso is a blended miso made with both barley koji and rice koji. Its only ingredients are soybeans, koji (barley koji + rice koji), and salt.",
        "[EN TODO] The soybeans are a rare blue soybean variety grown without pesticides, exclusively by contracted farmers in Fujiyoshida at the foot of Mt. Fuji — low in oil and high in natural sugars, giving the miso its pronounced sweetness.",
        "[EN TODO] It is naturally brewed with no additives, a 'living miso' whose fermentation is never halted. It is made without heat treatment or alcohol to stop fermentation, cooked in a traditional earthen kettle (jigama) and finished by adding back its own simmered liquid (miso tamari).",
      ],
    },
    // TODO(data-verify): 要・磯部様確認(味の数値は一般的な赤味噌の傾向からの推測)
    taste: {
      value: { sweetness: 2, saltiness: 4, richness: 5, aroma: 4 },
      confidence: "provisional",
      note: "一般的な赤味噌系の傾向からの仮値。実測・ヒアリングで要確認。",
    },
    tasteNotes: {
      value: {
        ja: "塩味とコクがしっかりとした、力強い味わいと推測されます。",
        en: "[EN TODO] Expected to have a bold flavor with pronounced saltiness and richness.",
      },
      confidence: "provisional",
    },
    // TODO(data-verify): 要・磯部様確認
    ingredients: {
      value: [
        { ja: "大豆", en: "[EN TODO] Soybeans" },
        { ja: "麹(麦麹+米糀)", en: "[EN TODO] Koji (barley koji + rice koji)" },
        { ja: "塩", en: "[EN TODO] Salt" },
      ],
      confidence: "confirmed",
    },
    allergens: { value: null, confidence: "unverified" },
    dietary: {
      value: { vegan: null, halal: null, glutenFree: null },
      confidence: "unverified",
    },
    agingMonths: {
      value: 12,
      confidence: "confirmed",
      note: "熟成期間は約1年近くとされています。",
    },
    priceVariants: {
      value: [
        { netWeightG: 400, priceYen: 700 },
        { netWeightG: 650, priceYen: 1138 },
        { netWeightG: 1000, priceYen: 1750 },
      ],
      confidence: "confirmed",
    },
    pairings: [
      { ja: "味噌汁", en: "[EN TODO] Miso soup" },
      { ja: "豚汁", en: "[EN TODO] Pork and vegetable miso soup" },
      { ja: "味噌おでん", en: "[EN TODO] Miso oden" },
    ],
    recipeIds: ["miso-soup", "hoto", "miso-dengaku"],
    images: {
      hero: {
        src: "/images/brand/cropped/koshu-miso-photo.jpg",
        alt: { ja: "甲州みそのイメージ画像", en: "[EN TODO] Koshu Miso image" },
        width: 340,
        height: 255,
        isPlaceholder: false,
      },
      thumb: {
        src: "/images/brand/cropped/koshu-miso-photo.jpg",
        alt: { ja: "甲州みそのサムネイル", en: "[EN TODO] Koshu Miso thumbnail" },
        width: 340,
        height: 255,
        isPlaceholder: false,
      },
    },
    purchase: { ecUrl: "http://www.misokoubounosato.stores.jp", isPlaceholderUrl: false },
  },
  {
    id: "rice-miso",
    slug: "rice-miso",
    order: 2,
    name: { ja: "米みそ", en: "[EN TODO] Rice Miso" },
    catchCopy: {
      ja: "やさしい甘みのまろやかな味",
      en: "[EN TODO] A mellow taste with gentle sweetness.",
    },
    body: {
      ja: [
        "毎日の食卓にやさしく寄り添う、バランスの良い味わい。",
        "米味噌は、大豆・麹・塩のみを原材料とする味噌です(麹の種類は確認中)。",
        "天然醸造・無添加で、発酵を止めていない「生きた味噌」。加熱処理や発酵止めのアルコール添加は行わず、地釜で炊き上げた煮汁(味噌のたまり)を加えて仕込んでいます。",
      ],
      en: [
        "[EN TODO] Rice Miso is made using only soybeans, koji, and salt (the exact type of koji used is still being confirmed).",
        "[EN TODO] It is naturally brewed with no additives, a 'living miso' whose fermentation is never halted. It is made without heat treatment or alcohol to stop fermentation, cooked in a traditional earthen kettle (jigama) and finished by adding back its own simmered liquid (miso tamari).",
      ],
    },
    // TODO(data-verify): 要・磯部様確認(標準的な米味噌の傾向からの推測)
    taste: {
      value: { sweetness: 3, saltiness: 3, richness: 3, aroma: 3 },
      confidence: "provisional",
      note: "標準的な米味噌の傾向からの仮値。実測・ヒアリングで要確認。",
    },
    tasteNotes: {
      value: {
        ja: "甘み・塩味・コクのバランスが取れた、標準的な味わいと推測されます。",
        en: "[EN TODO] Expected to have a balanced, standard flavor profile.",
      },
      confidence: "provisional",
    },
    ingredients: {
      value: [
        { ja: "大豆", en: "[EN TODO] Soybeans" },
        { ja: "麹", en: "[EN TODO] Koji" },
        { ja: "塩", en: "[EN TODO] Salt" },
      ],
      confidence: "confirmed",
    },
    allergens: { value: null, confidence: "unverified" },
    dietary: {
      value: { vegan: null, halal: null, glutenFree: null },
      confidence: "unverified",
    },
    agingMonths: { value: null, confidence: "unverified" },
    priceVariants: {
      value: [{ netWeightG: 1000, priceYen: 2060 }],
      confidence: "confirmed",
    },
    pairings: [
      { ja: "味噌汁", en: "[EN TODO] Miso soup" },
      { ja: "味噌漬け", en: "[EN TODO] Miso-pickled vegetables" },
      { ja: "野菜の味噌和え", en: "[EN TODO] Vegetables with miso dressing" },
    ],
    recipeIds: ["miso-soup", "miso-yaki-onigiri", "shojin-fermented-lunch"],
    images: {
      hero: {
        src: "/images/brand/cropped/rice-miso-photo.jpg",
        alt: { ja: "米みそのイメージ画像", en: "[EN TODO] Rice Miso image" },
        width: 345,
        height: 259,
        isPlaceholder: false,
      },
      thumb: {
        src: "/images/brand/cropped/rice-miso-photo.jpg",
        alt: { ja: "米みそのサムネイル", en: "[EN TODO] Rice Miso thumbnail" },
        width: 345,
        height: 259,
        isPlaceholder: false,
      },
    },
    purchase: { ecUrl: "http://www.misokoubounosato.stores.jp", isPlaceholderUrl: false },
  },
  {
    id: "kinzanji-miso",
    slug: "kinzanji-miso",
    order: 3,
    name: { ja: "金山寺みそ", en: "[EN TODO] Kinzanji Miso" },
    catchCopy: {
      ja: "野菜や麹の旨みが詰まった贅沢な味",
      en: "[EN TODO] A luxurious taste packed with the flavor of vegetables and koji.",
    },
    body: {
      ja: [
        "そのままご飯のお供に。甘みのある、おかず味噌。",
        "金山寺味噌は、具材の入った「おかず味噌」の一種です。",
        "調味料としてだけでなく、そのまま食べられる甘みのある味噌と推測されます(詳細は確認中)。",
      ],
      en: [
        "[EN TODO] Kinzanji Miso is a type of 'side-dish miso' containing visible ingredients.",
        "[EN TODO] It is expected to be a sweet miso enjoyable on its own, not only as a seasoning (details pending confirmation).",
      ],
    },
    // TODO(data-verify): 要・磯部様確認(一般的な金山寺味噌の傾向からの推測)
    taste: {
      value: { sweetness: 4, saltiness: 2, richness: 3, aroma: 3 },
      confidence: "provisional",
      note: "一般的な金山寺味噌(おかず味噌)の傾向からの仮値。実測・ヒアリングで要確認。",
    },
    tasteNotes: {
      value: {
        ja: "甘みが強く、具材の食感も楽しめる味わいと推測されます。",
        en: "[EN TODO] Expected to be notably sweet, with texture from the mixed-in ingredients.",
      },
      confidence: "provisional",
    },
    ingredients: { value: null, confidence: "unverified" },
    allergens: { value: null, confidence: "unverified" },
    dietary: {
      value: { vegan: null, halal: null, glutenFree: null },
      confidence: "unverified",
    },
    agingMonths: { value: null, confidence: "unverified" },
    priceVariants: {
      value: [
        { netWeightG: 100, priceYen: 324 },
        { netWeightG: 180, priceYen: 540 },
      ],
      confidence: "confirmed",
    },
    pairings: [
      { ja: "ご飯のお供", en: "[EN TODO] As a side dish with rice" },
      { ja: "お茶漬け", en: "[EN TODO] Ochazuke" },
      { ja: "冷やし豆腐", en: "[EN TODO] Chilled tofu" },
    ],
    recipeIds: ["vegetable-miso-dip", "shojin-fermented-lunch"],
    images: {
      hero: {
        src: "/images/brand/cropped/kinzanji-miso-photo.jpg",
        alt: { ja: "金山寺みそのイメージ画像", en: "[EN TODO] Kinzanji Miso image" },
        width: 354,
        height: 266,
        isPlaceholder: false,
      },
      thumb: {
        src: "/images/brand/cropped/kinzanji-miso-photo.jpg",
        alt: { ja: "金山寺みそのサムネイル", en: "[EN TODO] Kinzanji Miso thumbnail" },
        width: 354,
        height: 266,
        isPlaceholder: false,
      },
    },
    purchase: { ecUrl: "http://www.misokoubounosato.stores.jp", isPlaceholderUrl: false },
  },
];
