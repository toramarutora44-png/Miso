import type { Product } from "@/types/product";

/**
 * 商品の仮データ。
 *
 * catchCopy・味の説明・おすすめの食べ方・甲州みそ/米みその原材料・製法・価格・
 * 熟成期間(甲州みそのみ)は公式POP(みそ工房の郷_味噌POP_A5縦_300dpi.jpg、2026-10-31確認)に
 * 準拠した確定表現(confirmed)。
 * 金山寺みその原材料はPOP記載分のみ confirmed とし、全原材料・配合は確認中。
 * 金山寺みそには甲州みそ・米みその製法記述(無添加/天然醸造/青大豆等)を流用しないこと
 * (適用根拠がないため)。
 *
 * taste(甘み/塩味/コク/香りの数値バー)は根拠のない推測値のため、商品詳細・比較画面では
 * 使用しない(非表示)。TasteBarコンポーネント自体は削除せず、呼び出しのみ停止する。
 * vegan / halal は安全側に倒して null(未確認)固定とし、安易に true を入れないこと。
 *
 * TODO(data-verify): 要・磯部様確認 — taste(甘み/塩味/コク/香りの数値)・allergens・
 * dietary・米みその熟成期間・麹の種類・金山寺みその全原材料配合は未確認のままです。
 */
export const products: Product[] = [
  {
    id: "koshu-miso",
    slug: "koshu-miso",
    order: 1,
    name: { ja: "甲州みそ", en: "[EN TODO] Koshu Miso" },
    catchCopy: {
      ja: "麦麹が香る、甘みの軽い合わせ味噌。",
      en: "[EN TODO] A barley-koji miso with light sweetness.",
    },
    body: {
      ja: [
        "麦麹と米麹を合わせた、香り高い合わせ味噌です。甘みは軽く、麦麹の香ばしさが立ちます。",
        "甲州味噌は、麦麹と米糀を合わせた「麦麹・米糀合わせ味噌」です。原材料は大豆・麹(麦麹+米糀)・塩のみ。",
        "大豆には、山梨県富士吉田市(富士山麓)の契約農家専用栽培による無農薬の希少な青大豆を使用。油分が少なく糖度が高いため、甘みの強い味わいが特徴です。",
        "天然醸造・無添加で、発酵を止めていない「生きた味噌」。加熱処理や発酵止めのアルコール添加は行わず、地釜で炊き上げた煮汁(味噌のたまり)を加えて仕込んでいます。",
      ],
      en: [
        "[EN TODO] A fragrant blended miso made with both barley koji and rice koji. Its sweetness is light, with the toasty aroma of barley koji standing out.",
        "[EN TODO] Koshu Miso is a blended miso made with both barley koji and rice koji. Its only ingredients are soybeans, koji (barley koji + rice koji), and salt.",
        "[EN TODO] The soybeans are a rare blue soybean variety grown without pesticides, exclusively by contracted farmers in Fujiyoshida at the foot of Mt. Fuji — low in oil and high in natural sugars, giving the miso its pronounced sweetness.",
        "[EN TODO] It is naturally brewed with no additives, a 'living miso' whose fermentation is never halted. It is made without heat treatment or alcohol to stop fermentation, cooked in a traditional earthen kettle (jigama) and finished by adding back its own simmered liquid (miso tamari).",
      ],
    },
    // taste数値バーは根拠のない推測値のため、商品詳細・比較画面では非表示とする(TasteBar呼び出し停止)。
    taste: {
      value: { sweetness: 2, saltiness: 4, richness: 5, aroma: 4 },
      confidence: "provisional",
      note: "一般的な赤味噌系の傾向からの仮値。実測・ヒアリングで要確認。非表示運用中。",
    },
    tasteNotes: {
      value: {
        ja: "麦麹が香る、甘みの軽い合わせ味噌です。",
        en: "[EN TODO] A barley-koji blended miso with light sweetness.",
      },
      confidence: "confirmed",
    },
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
      { ja: "ほうとう", en: "[EN TODO] Hoto (Yamanashi-style udon hot pot)" },
      { ja: "味噌炒め", en: "[EN TODO] Miso stir-fry" },
      { ja: "焼きおにぎり", en: "[EN TODO] Grilled rice balls" },
    ],
    recipeIds: ["hoto", "miso-dengaku"],
    images: {
      hero: {
        src: "/images/farm/aomame-pods-fuji.jpg",
        alt: {
          ja: "富士山を背景にした、甲州みその原材料・青大豆の莢",
          en: "[EN TODO] Blue soybean pods used for Koshu Miso, with Mt. Fuji in the background",
        },
        width: 900,
        height: 1199,
        isPlaceholder: false,
      },
      thumb: {
        src: "/images/products/koshu-miso-pop.jpg",
        alt: { ja: "甲州みそのサムネイル", en: "[EN TODO] Koshu Miso thumbnail" },
        width: 248,
        height: 238,
        isPlaceholder: false,
      },
    },
    purchase: { ecUrl: "https://misokoubounosato.stores.jp/", isPlaceholderUrl: false },
  },
  {
    id: "rice-miso",
    slug: "rice-miso",
    order: 2,
    name: { ja: "米みそ", en: "[EN TODO] Rice Miso" },
    catchCopy: {
      ja: "クセのない、マイルドで親しみやすい味。",
      en: "[EN TODO] A mild, approachable taste with no strong edge.",
    },
    body: {
      ja: [
        "クセがなく、どなたにも親しみやすいまろやかな甘みの味噌です。",
        "米味噌は、大豆・麹・塩のみを原材料とする味噌です(麹の種類は確認中)。",
        "天然醸造・無添加で、発酵を止めていない「生きた味噌」。加熱処理や発酵止めのアルコール添加は行わず、地釜で炊き上げた煮汁(味噌のたまり)を加えて仕込んでいます。",
      ],
      en: [
        "[EN TODO] A mellow, gently sweet miso with no strong edge, approachable for everyone.",
        "[EN TODO] Rice Miso is made using only soybeans, koji, and salt (the exact type of koji used is still being confirmed).",
        "[EN TODO] It is naturally brewed with no additives, a 'living miso' whose fermentation is never halted. It is made without heat treatment or alcohol to stop fermentation, cooked in a traditional earthen kettle (jigama) and finished by adding back its own simmered liquid (miso tamari).",
      ],
    },
    // taste数値バーは根拠のない推測値のため、商品詳細・比較画面では非表示とする(TasteBar呼び出し停止)。
    taste: {
      value: { sweetness: 3, saltiness: 3, richness: 3, aroma: 3 },
      confidence: "provisional",
      note: "標準的な米味噌の傾向からの仮値。実測・ヒアリングで要確認。非表示運用中。",
    },
    tasteNotes: {
      value: {
        ja: "クセがなく、どなたにも親しみやすいまろやかな甘みの味噌です。",
        en: "[EN TODO] A mellow, gently sweet miso approachable for everyone.",
      },
      confidence: "confirmed",
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
    // 熟成期間は未確認のため非表示(SpecTableはnullの行を出さない)。
    agingMonths: { value: null, confidence: "unverified" },
    priceVariants: {
      value: [{ netWeightG: 1000, priceYen: 2060 }],
      confidence: "confirmed",
    },
    pairings: [{ ja: "毎日の味噌汁に。", en: "[EN TODO] Great in everyday miso soup." }],
    recipeIds: ["miso-soup", "miso-yaki-onigiri"],
    images: {
      hero: {
        src: "/images/process/boiling-01.jpg",
        alt: {
          ja: "大釜で青大豆を煮る、味噌づくりの工程",
          en: "[EN TODO] Simmering blue soybeans in a large kettle during miso-making",
        },
        width: 1000,
        height: 1000,
        isPlaceholder: false,
      },
      thumb: {
        src: "/images/products/rice-miso-pop.jpg",
        alt: { ja: "米みそのサムネイル", en: "[EN TODO] Rice Miso thumbnail" },
        width: 248,
        height: 238,
        isPlaceholder: false,
      },
    },
    purchase: { ecUrl: "https://misokoubounosato.stores.jp/", isPlaceholderUrl: false },
  },
  {
    id: "kinzanji-miso",
    slug: "kinzanji-miso",
    order: 3,
    name: { ja: "金山寺みそ", en: "[EN TODO] Kinzanji Miso" },
    catchCopy: {
      ja: "大豆・麦・なす入り。甘じょっぱい具だくさん。",
      en: "[EN TODO] With soybeans, barley, and eggplant — a sweet-and-salty, ingredient-packed miso.",
    },
    body: {
      ja: [
        "具だくさんの甘じょっぱい「おかず味噌」。調味料ではなく、そのままお召し上がりいただけます。",
        "ごはんのお供や、きゅうり・豆腐にのせるなど、そのまま食べる味噌としてお楽しみください。",
      ],
      en: [
        "[EN TODO] A sweet-and-salty, ingredient-packed 'side-dish miso.' Not a seasoning — enjoy it as-is.",
        "[EN TODO] Great on rice, or spooned over cucumber or tofu, as a miso meant to be eaten on its own.",
      ],
    },
    // taste数値バーは根拠のない推測値のため、商品詳細・比較画面では非表示とする(TasteBar呼び出し停止)。
    taste: {
      value: { sweetness: 4, saltiness: 2, richness: 3, aroma: 3 },
      confidence: "provisional",
      note: "一般的な金山寺味噌(おかず味噌)の傾向からの仮値。実測・ヒアリングで要確認。非表示運用中。",
    },
    tasteNotes: {
      value: {
        ja: "甘じょっぱい、具だくさんのおかず味噌です。",
        en: "[EN TODO] A sweet-and-salty, ingredient-packed side-dish miso.",
      },
      confidence: "confirmed",
    },
    // POP記載分のみ confirmed。全原材料・配合は確認中(他商品の製法記述は流用しない)。
    ingredients: {
      value: [
        { ja: "大豆", en: "[EN TODO] Soybeans" },
        { ja: "麦", en: "[EN TODO] Barley" },
        { ja: "なす ほか", en: "[EN TODO] Eggplant, and others" },
      ],
      confidence: "confirmed",
      note: "POP記載分のみ。全原材料・配合は確認中。",
    },
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
      { ja: "ごはんにのせて", en: "[EN TODO] On rice" },
      { ja: "きゅうりにのせて", en: "[EN TODO] On cucumber" },
      { ja: "豆腐にのせて", en: "[EN TODO] On tofu" },
    ],
    recipeIds: ["vegetable-miso-dip"],
    images: {
      hero: {
        src: "/images/products/kinzanji-miso-pop.jpg",
        alt: { ja: "金山寺みそのパッケージ写真", en: "[EN TODO] Kinzanji Miso package photo" },
        width: 248,
        height: 238,
        isPlaceholder: false,
      },
      thumb: {
        src: "/images/products/kinzanji-miso-pop.jpg",
        alt: { ja: "金山寺みそのサムネイル", en: "[EN TODO] Kinzanji Miso thumbnail" },
        width: 248,
        height: 238,
        isPlaceholder: false,
      },
    },
    purchase: { ecUrl: "https://misokoubounosato.stores.jp/", isPlaceholderUrl: false },
  },
];
