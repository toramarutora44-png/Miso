import type { Product } from "@/types/product";

/**
 * 商品の仮データ。
 *
 * catchCopy・味の説明・おすすめの食べ方・製法は公式POP(みそ工房の郷_味噌POP_A5縦_300dpi.jpg、
 * 2026-10-31確認)に準拠した確定表現(confirmed)。
 * 甲州みそ・米みそ・金山寺みその原材料は、実在する公式サイト(QRコード遷移先)の
 * 一次情報で確認済みのため、いずれも confirmed。
 * 金山寺みそには甲州みそ・米みその製法記述(無添加/天然醸造/青大豆等)を流用しないこと
 * (適用根拠がないため)。
 *
 * agingMonths(熟成期間)は磯部様に確認済み(2026-11-01): 甲州みそ・米みそ=10ヶ月、
 * 金山寺みそ=1ヶ月。
 * priceVariants(価格)は確認済みの値だが、委託先の店舗ごとに価格が異なるため
 * 磯部様の意向(2026-11-01)によりサイト上には表示しない(SpecTable・ProductCard側で非表示化)。
 * データ自体は将来の用途のため残す。
 *
 * taste(甘み/塩味/コク/香りの数値バー)は根拠のない推測値のため、商品詳細・比較画面では
 * 使用しない(非表示)。TasteBarコンポーネント自体は削除せず、呼び出しのみ停止する。
 * vegan / halal は安全側に倒して null(未確認)固定とし、安易に true を入れないこと
 * (バッジ表示は components/brand/CertBadges.tsx が別途、商品別に行う)。
 *
 * 製造工程写真(青大豆の浸漬・煮熟等、process/*.jpg)は特定の商品に紐づくものではなく、
 * 全商品に共通する工程であるため、個別商品の images.craftFigure としては設定しない。
 * これらは生産者ページ(/producer)の製法セクションに一本化して掲載する(2026-11-01)。
 *
 * TODO(data-verify): 要・磯部様確認 — taste(甘み/塩味/コク/香りの数値)・allergens・dietary。
 */
export const products: Product[] = [
  {
    id: "koshu-miso",
    slug: "koshu-miso",
    order: 1,
    name: { ja: "甲州みそ", en: "Koshu Miso" },
    catchCopy: {
      ja: "麦麹が香る、甘みの軽い合わせ味噌。",
      en: "A barley-koji miso with light sweetness.",
    },
    body: {
      ja: [
        "麦麹と米麹を合わせた、香り高い合わせ味噌です。甘みは軽く、麦麹の香ばしさが立ちます。",
        "甲州味噌は、麦麹と米糀を合わせた「麦麹・米糀合わせ味噌」です。原材料は大豆・麹(麦麹+米糀)・塩のみ。",
        "大豆には、山梨県富士吉田市(富士山麓)の契約農家専用栽培による無農薬の希少な青大豆を使用。油分が少なく糖度が高いため、甘みの強い味わいが特徴です。",
        "天然醸造・無添加で、発酵を止めていない「生きた味噌」。加熱処理や発酵止めのアルコール添加は行わず、地釜で炊き上げた煮汁(味噌のたまり)を加えて仕込んでいます。",
      ],
      en: [
        "A fragrant blended miso made with both barley koji and rice koji. Its sweetness is light, with the toasty aroma of barley koji standing out.",
        "Koshu Miso is a blended miso made with both barley koji and rice koji. Its only ingredients are soybeans, koji (barley koji + rice koji), and salt.",
        "The soybeans are a rare blue soybean variety grown without pesticides, exclusively by contracted farmers in Fujiyoshida at the foot of Mt. Fuji — low in oil and high in natural sugars, giving the miso its pronounced sweetness.",
        "It is naturally brewed with no additives, a 'living miso' whose fermentation is never halted. It is made without heat treatment or alcohol to stop fermentation, cooked in a traditional earthen kettle (jigama) and finished by adding back its own simmered liquid (miso tamari).",
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
        en: "A barley-koji blended miso with light sweetness.",
      },
      confidence: "confirmed",
    },
    ingredients: {
      value: [
        { ja: "大豆", en: "Soybeans" },
        { ja: "麹(麦麹+米糀)", en: "Koji (barley koji + rice koji)" },
        { ja: "塩", en: "Salt" },
      ],
      confidence: "confirmed",
    },
    allergens: { value: null, confidence: "unverified" },
    dietary: {
      value: { vegan: null, halal: null, glutenFree: null },
      confidence: "unverified",
    },
    agingMonths: { value: 10, confidence: "confirmed" },
    priceVariants: {
      value: [
        { netWeightG: 400, priceYen: 700 },
        { netWeightG: 650, priceYen: 1138 },
        { netWeightG: 1000, priceYen: 1750 },
      ],
      confidence: "confirmed",
    },
    pairings: [
      { ja: "ほうとう", en: "Hoto (Yamanashi-style udon hot pot)" },
      { ja: "味噌炒め", en: "Miso stir-fry" },
      { ja: "焼きおにぎり", en: "Grilled rice balls" },
      { ja: "貝の味噌汁", en: "Clam miso soup" },
    ],
    recipeIds: [
      "kabocha-kinoko-hoto",
      "nasu-toriniku-shoga-miso",
      "ninniku-miso-yaki-onigiri",
      "asari-negi-miso-soup",
      "tori-negi-miso-yaki",
    ],
    images: {
      hero: {
        src: "/images/products/koshu-miso.jpg",
        alt: { ja: "甲州みそのパッケージ写真", en: "Koshu Miso package photo" },
        width: 760,
        height: 760,
        isPlaceholder: false,
      },
      thumb: {
        src: "/images/products/koshu-miso.jpg",
        alt: { ja: "甲州みそのサムネイル", en: "Koshu Miso thumbnail" },
        width: 760,
        height: 760,
        isPlaceholder: false,
      },
    },
    purchase: { ecUrl: "https://misokoubounosato.stores.jp/", isPlaceholderUrl: false },
  },
  {
    id: "rice-miso",
    slug: "rice-miso",
    order: 2,
    name: { ja: "米みそ", en: "Rice Miso" },
    catchCopy: {
      ja: "クセのない、マイルドで親しみやすい味。",
      en: "A mild, approachable taste with no strong edge.",
    },
    body: {
      ja: [
        "クセがなく、どなたにも親しみやすいまろやかな甘みの味噌です。",
        "米味噌は、大豆・米麹・食塩のみを原材料とする味噌です。麹は米麹のみで、合わせ味噌ではありません。",
        "天然醸造・無添加で、発酵を止めていない「生きた味噌」。加熱処理や発酵止めのアルコール添加は行わず、地釜で炊き上げた煮汁(味噌のたまり)を加えて仕込んでいます。",
      ],
      en: [
        "A mellow, gently sweet miso with no strong edge, approachable for everyone.",
        "Rice Miso is made using only soybeans, rice koji, and salt. The koji used is rice koji only — this is not a blended (awase) miso.",
        "It is naturally brewed with no additives, a 'living miso' whose fermentation is never halted. It is made without heat treatment or alcohol to stop fermentation, cooked in a traditional earthen kettle (jigama) and finished by adding back its own simmered liquid (miso tamari).",
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
        en: "A mellow, gently sweet miso approachable for everyone.",
      },
      confidence: "confirmed",
    },
    ingredients: {
      value: [
        { ja: "大豆", en: "Soybeans" },
        { ja: "米麹", en: "Rice koji" },
        { ja: "食塩", en: "Salt" },
      ],
      confidence: "confirmed",
    },
    allergens: { value: null, confidence: "unverified" },
    dietary: {
      value: { vegan: null, halal: null, glutenFree: null },
      confidence: "unverified",
    },
    agingMonths: { value: 10, confidence: "confirmed" },
    priceVariants: {
      value: [{ netWeightG: 1000, priceYen: 2060 }],
      confidence: "confirmed",
    },
    pairings: [{ ja: "毎日の味噌汁に。", en: "Great in everyday miso soup." }],
    recipeIds: [
      "sake-kinoko-miso-butter-foil",
      "kabocha-tamanegi-tonyu-miso-potage",
      "tofu-wakame-tamago-miso-soup",
      "mushi-dori-gomamiso-dare",
      "kinoko-miso-cream-pasta",
    ],
    images: {
      hero: {
        src: "/images/products/rice-miso.jpg",
        alt: { ja: "米みそのパッケージ写真", en: "Rice Miso package photo" },
        width: 760,
        height: 760,
        isPlaceholder: false,
      },
      thumb: {
        src: "/images/products/rice-miso.jpg",
        alt: { ja: "米みそのサムネイル", en: "Rice Miso thumbnail" },
        width: 760,
        height: 760,
        isPlaceholder: false,
      },
    },
    purchase: { ecUrl: "https://misokoubounosato.stores.jp/", isPlaceholderUrl: false },
  },
  {
    id: "kinzanji-miso",
    slug: "kinzanji-miso",
    order: 3,
    name: { ja: "金山寺みそ", en: "Kinzanji Miso" },
    catchCopy: {
      ja: "麦麹・米麹・なす入り。甘じょっぱい具だくさん。",
      en: "With barley koji, rice koji, and eggplant — a sweet-and-salty, ingredient-packed miso.",
    },
    body: {
      ja: [
        "具だくさんの甘じょっぱい「おかず味噌」。調味料ではなく、そのままお召し上がりいただけます。",
        "ごはんのお供や、きゅうり・豆腐にのせるなど、そのまま食べる味噌としてお楽しみください。",
      ],
      en: [
        "A sweet-and-salty, ingredient-packed 'side-dish miso.' Not a seasoning — enjoy it as-is.",
        "Great on rice, or spooned over cucumber or tofu, as a miso meant to be eaten on its own.",
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
        en: "A sweet-and-salty, ingredient-packed side-dish miso.",
      },
      confidence: "confirmed",
    },
    // 他商品(甲州みそ・米みそ)の製法記述(無添加/天然醸造/青大豆等)は流用しない。
    ingredients: {
      value: [
        { ja: "麦麹", en: "Barley koji" },
        { ja: "米麹", en: "Rice koji" },
        { ja: "なす", en: "Eggplant" },
        { ja: "大豆", en: "Soybeans" },
        { ja: "醤油", en: "Soy sauce" },
        { ja: "砂糖", en: "Sugar" },
        { ja: "水飴", en: "Starch syrup" },
      ],
      confidence: "confirmed",
    },
    allergens: { value: null, confidence: "unverified" },
    dietary: {
      value: { vegan: null, halal: null, glutenFree: null },
      confidence: "unverified",
    },
    agingMonths: { value: 1, confidence: "confirmed" },
    priceVariants: {
      value: [
        { netWeightG: 100, priceYen: 324 },
        { netWeightG: 180, priceYen: 540 },
      ],
      confidence: "confirmed",
    },
    pairings: [
      { ja: "ごはんにのせて", en: "On rice" },
      { ja: "きゅうりにのせて", en: "On cucumber" },
      { ja: "豆腐にのせて", en: "On tofu" },
    ],
    recipeIds: [
      "oba-goma-onigiri-kinzanji",
      "yaki-nasu-miso-cheese",
      "avocado-hiya-yakko-kinzanji",
      "shinjaga-misomayo-salad",
      "mushidori-kyuri-lettuce-wrap",
    ],
    images: {
      hero: {
        src: "/images/products/kinzanji-miso.jpg",
        alt: { ja: "金山寺みそのパッケージ写真", en: "Kinzanji Miso package photo" },
        width: 760,
        height: 760,
        isPlaceholder: false,
      },
      thumb: {
        src: "/images/products/kinzanji-miso.jpg",
        alt: { ja: "金山寺みそのサムネイル", en: "Kinzanji Miso thumbnail" },
        width: 760,
        height: 760,
        isPlaceholder: false,
      },
    },
    purchase: { ecUrl: "https://misokoubounosato.stores.jp/", isPlaceholderUrl: false },
  },
];
