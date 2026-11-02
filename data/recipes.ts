import type { Recipe } from "@/types/recipe";

/**
 * レシピ(アレンジ提案)データ。
 *
 * 公式POPに「レシピは未試作のアレンジ提案です。」との注記があり、本サイトでも
 * 「当店が試作・監修したものではなく、味噌の使い方のご提案です。」と明記する
 * (各レシピ詳細ページ冒頭に固定表示。locales/ja.json の recipe.disclaimer)。
 *
 * 本ファイルの15件は、実在する公式サイト(QRコード遷移先)から確認済みの一次情報
 * (材料・作り方・コツ)に基づくため、全件 confidence: "confirmed"。
 * 件数(15件)は公式POPの「特徴とレシピ15品」表記と一致する。
 *
 * servings は出典元に「すべて2人分」と明記されているため全件confirmed。
 * timeMinutes / difficulty は本文に明記がないため、通常の調理知識から妥当な値を
 * 補完した付帯情報であり、レシピ本体(材料・作り方・コツ・人数)の確定情報とは
 * 性質が異なる点に留意する。
 *
 * image: 2026-11-02、ユーザー提供のAI生成料理写真(調理イメージ)を使用許可済み。
 * 各レシピ詳細・カードに「※写真は調理イメージです。」の注記を併記する前提で運用。
 */
export const recipes: Recipe[] = [
  {
    id: "kabocha-kinoko-hoto",
    slug: "kabocha-kinoko-hoto",
    order: 1,
    title: { ja: "かぼちゃときのこのほうとう", en: "[EN TODO] Kabocha and Mushroom Hoto" },
    productIds: ["koshu-miso"],
    tags: ["main", "local"],
    timeMinutes: 40,
    servings: 2,
    difficulty: 2,
    ingredients: [
      { name: { ja: "生ほうとう", en: "[EN TODO] Fresh hoto udon noodles" }, amount: { ja: "200g", en: "200g" } },
      { name: { ja: "かぼちゃ", en: "[EN TODO] Kabocha squash" }, amount: { ja: "180g", en: "180g" } },
      { name: { ja: "白菜", en: "[EN TODO] Napa cabbage" }, amount: { ja: "100g", en: "100g" } },
      { name: { ja: "しめじ", en: "[EN TODO] Shimeji mushrooms" }, amount: { ja: "50g", en: "50g" } },
      { name: { ja: "にんじん", en: "[EN TODO] Carrot" }, amount: { ja: "40g", en: "40g" } },
      { name: { ja: "油揚げ", en: "[EN TODO] Fried tofu pouch" }, amount: { ja: "1/2枚", en: "[EN TODO] 1/2 piece" } },
      { name: { ja: "昆布だし", en: "[EN TODO] Kombu dashi" }, amount: { ja: "800mL", en: "800mL" } },
      { name: { ja: "甲州みそ", en: "[EN TODO] Koshu miso" }, amount: { ja: "大さじ2〜2と1/2", en: "[EN TODO] 2-2.5 tbsp" } },
    ],
    steps: [
      {
        text: {
          ja: "かぼちゃを一口大に、白菜・にんじん・油揚げを適量に切り、しめじをほぐす。",
          en: "[EN TODO] Cut the kabocha into bite-size pieces, slice the napa cabbage, carrot, and fried tofu, and separate the shimeji.",
        },
      },
      {
        text: {
          ja: "だしをにんじんと共に火にかけ、沸いたら麺とかぼちゃを入れ、続けて残りの具材を加える。",
          en: "[EN TODO] Heat the dashi with the carrot, and once boiling add the noodles and kabocha, then the remaining ingredients.",
        },
      },
      {
        text: {
          ja: "麺と野菜がパッケージの表示時間で火が通るまで煮る。",
          en: "[EN TODO] Simmer until the noodles and vegetables are cooked through, per the package's stated time.",
        },
      },
      {
        text: {
          ja: "火を弱め、味噌を溶き入れて味を調える。",
          en: "[EN TODO] Lower the heat, dissolve in the miso, and adjust the seasoning.",
        },
      },
    ],
    tip: {
      ja: "かぼちゃの一部を軽く崩して汁になじませます。甘みととろみを楽しむ、具だくさんの一杯です。",
      en: "[EN TODO] Lightly crush some of the kabocha so it blends into the broth. A hearty bowl to enjoy for its sweetness and thickness.",
    },
    image: {
      src: "/images/recipes/kabocha-kinoko-hoto.jpg",
      alt: { ja: "かぼちゃときのこのほうとう", en: "[EN TODO] Kabocha and Mushroom Hoto" },
      width: 1200,
      height: 900,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
  {
    id: "nasu-toriniku-shoga-miso",
    slug: "nasu-toriniku-shoga-miso",
    order: 2,
    title: { ja: "なすと鶏ひき肉のしょうが味噌炒め", en: "[EN TODO] Eggplant and Ground Chicken Stir-fry with Ginger Miso" },
    productIds: ["koshu-miso"],
    tags: ["main"],
    timeMinutes: 20,
    servings: 2,
    difficulty: 2,
    ingredients: [
      { name: { ja: "なす", en: "[EN TODO] Eggplant" }, amount: { ja: "2本", en: "[EN TODO] 2" } },
      { name: { ja: "鶏ひき肉", en: "[EN TODO] Ground chicken" }, amount: { ja: "150g", en: "150g" } },
      { name: { ja: "しょうが", en: "[EN TODO] Ginger" }, amount: { ja: "10g", en: "10g" } },
      { name: { ja: "ごま油", en: "[EN TODO] Sesame oil" }, amount: { ja: "大さじ1", en: "[EN TODO] 1 tbsp" } },
      { name: { ja: "甲州みそ", en: "[EN TODO] Koshu miso" }, amount: { ja: "大さじ1と1/2", en: "[EN TODO] 1.5 tbsp" } },
      { name: { ja: "砂糖", en: "[EN TODO] Sugar" }, amount: { ja: "小さじ2", en: "[EN TODO] 2 tsp" } },
      { name: { ja: "水", en: "[EN TODO] Water" }, amount: { ja: "大さじ2", en: "[EN TODO] 2 tbsp" } },
      { name: { ja: "青ねぎ", en: "[EN TODO] Green onion" }, amount: { ja: "適量", en: "[EN TODO] As needed" } },
    ],
    steps: [
      {
        text: {
          ja: "なすを乱切りに、しょうがをみじん切りにする。味噌・砂糖・水を別に混ぜておく。",
          en: "[EN TODO] Cut the eggplant into rough chunks and mince the ginger. Mix the miso, sugar, and water in a separate bowl.",
        },
      },
      {
        text: {
          ja: "フライパンでごま油としょうがを温め、ひき肉を崩しながら炒め、なすを加える。",
          en: "[EN TODO] Warm the sesame oil and ginger in a frying pan, stir-fry the ground chicken while breaking it up, then add the eggplant.",
        },
      },
      {
        text: {
          ja: "蓋をして鶏肉に火が通るまで蒸し焼きにし、合わせ調味料を加えて絡める。",
          en: "[EN TODO] Cover and steam-fry until the chicken is cooked through, then add the mixed seasoning and toss to coat.",
        },
      },
      { text: { ja: "青ねぎを散らす。", en: "[EN TODO] Sprinkle with green onion." } },
    ],
    tip: {
      ja: "仕上げにだけ少し火を強め、たれを具材にからめます。焦がさないように動かしながら仕上げてください。",
      en: "[EN TODO] Turn up the heat slightly only at the end to coat the ingredients with the sauce. Keep stirring to avoid burning it.",
    },
    image: {
      src: "/images/recipes/nasu-toriniku-shoga-miso.jpg",
      alt: { ja: "なすと鶏ひき肉のしょうが味噌炒め", en: "[EN TODO] Eggplant and Ground Chicken Stir-fry with Ginger Miso" },
      width: 880,
      height: 572,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
  {
    id: "ninniku-miso-yaki-onigiri",
    slug: "ninniku-miso-yaki-onigiri",
    order: 3,
    title: { ja: "にんにく味噌の香ばし焼きおにぎり", en: "[EN TODO] Garlic Miso Grilled Rice Balls" },
    productIds: ["koshu-miso"],
    tags: ["snack"],
    timeMinutes: 15,
    servings: 2,
    difficulty: 1,
    ingredients: [
      { name: { ja: "温かいごはん", en: "[EN TODO] Warm cooked rice" }, amount: { ja: "300g", en: "300g" } },
      { name: { ja: "甲州みそ", en: "[EN TODO] Koshu miso" }, amount: { ja: "大さじ1", en: "[EN TODO] 1 tbsp" } },
      { name: { ja: "砂糖", en: "[EN TODO] Sugar" }, amount: { ja: "小さじ1", en: "[EN TODO] 1 tsp" } },
      { name: { ja: "水", en: "[EN TODO] Water" }, amount: { ja: "小さじ1", en: "[EN TODO] 1 tsp" } },
      { name: { ja: "すりおろしにんにく", en: "[EN TODO] Grated garlic" }, amount: { ja: "少量", en: "[EN TODO] A small amount" } },
      { name: { ja: "ごま油", en: "[EN TODO] Sesame oil" }, amount: { ja: "小さじ1", en: "[EN TODO] 1 tsp" } },
    ],
    steps: [
      { text: { ja: "ごはんを4個のおにぎりに握る。", en: "[EN TODO] Shape the rice into 4 rice balls." } },
      { text: { ja: "味噌・砂糖・水・にんにくを混ぜておく。", en: "[EN TODO] Mix together the miso, sugar, water, and garlic." } },
      { text: { ja: "フライパンに薄く油を引き、おにぎりの両面を焼く。", en: "[EN TODO] Lightly oil a frying pan and grill both sides of the rice balls." } },
      {
        text: {
          ja: "表面が固まったら味噌だれを薄く塗り、弱火で短い間隔で焼き続ける。",
          en: "[EN TODO] Once the surface has firmed up, brush on a thin layer of the miso glaze and continue grilling over low heat in short intervals.",
        },
      },
    ],
    tip: {
      ja: "最初にごはんだけを焼いてから味噌を塗ります。味噌を焦がさず、表面の香ばしさを楽しむ仕上げにします。",
      en: "[EN TODO] Grill the rice plain first before applying the miso. Finish without burning the miso, enjoying the toasty surface.",
    },
    image: {
      src: "/images/recipes/ninniku-miso-yaki-onigiri.jpg",
      alt: { ja: "にんにく味噌の香ばし焼きおにぎり", en: "[EN TODO] Garlic Miso Grilled Rice Balls" },
      width: 880,
      height: 572,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
  {
    id: "asari-negi-miso-soup",
    slug: "asari-negi-miso-soup",
    order: 4,
    title: { ja: "あさりと長ねぎの味噌汁", en: "[EN TODO] Clam and Green Onion Miso Soup" },
    productIds: ["koshu-miso"],
    tags: ["soup"],
    timeMinutes: 20,
    servings: 2,
    difficulty: 2,
    ingredients: [
      { name: { ja: "殻付きあさり(砂抜き済み)", en: "[EN TODO] Shell-on clams (sand-removed)" }, amount: { ja: "250g", en: "250g" } },
      { name: { ja: "長ねぎ", en: "[EN TODO] Green onion" }, amount: { ja: "1/2本", en: "[EN TODO] 1/2" } },
      { name: { ja: "水", en: "[EN TODO] Water" }, amount: { ja: "450mL", en: "450mL" } },
      { name: { ja: "だし用昆布", en: "[EN TODO] Dashi kombu" }, amount: { ja: "5cm角1枚", en: "[EN TODO] One 5cm square piece" } },
      { name: { ja: "甲州みそ", en: "[EN TODO] Koshu miso" }, amount: { ja: "大さじ1〜1と1/2", en: "[EN TODO] 1-1.5 tbsp" } },
    ],
    steps: [
      { text: { ja: "あさりを流水でこすり洗いし、長ねぎを薄切りにする。", en: "[EN TODO] Scrub the clams under running water and thinly slice the green onion." } },
      {
        text: {
          ja: "鍋に水と昆布を入れ20分置き、あさりを加えて沸騰直前まで加熱し昆布を取り出す。",
          en: "[EN TODO] Place water and kombu in a pot, let sit for 20 minutes, add the clams, heat to just before boiling, and remove the kombu.",
        },
      },
      {
        text: {
          ja: "あさりに火が通っていることを確認し、口が開かない殻は取り除く。",
          en: "[EN TODO] Check that the clams are fully cooked, and discard any shells that have not opened.",
        },
      },
      { text: { ja: "長ねぎを加え、弱火で味噌を溶き入れる。", en: "[EN TODO] Add the green onion and dissolve in the miso over low heat." } },
    ],
    tip: {
      ja: "あさりの塩気を確かめてから、味噌を少しずつ足します。貝のうまみを生かす、控えめな味付けが狙いです。",
      en: "[EN TODO] Taste the clams' saltiness first, then add the miso little by little. The aim is a restrained seasoning that lets the clams' umami shine.",
    },
    image: {
      src: "/images/recipes/asari-negi-miso-soup.jpg",
      alt: { ja: "あさりと長ねぎの味噌汁", en: "[EN TODO] Clam and Green Onion Miso Soup" },
      width: 880,
      height: 572,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
  {
    id: "tori-negi-miso-yaki",
    slug: "tori-negi-miso-yaki",
    order: 5,
    title: { ja: "鶏もも肉のねぎ味噌焼き", en: "[EN TODO] Grilled Chicken Thigh with Green Onion Miso" },
    productIds: ["koshu-miso"],
    tags: ["main"],
    timeMinutes: 40,
    servings: 2,
    difficulty: 3,
    ingredients: [
      { name: { ja: "鶏もも肉", en: "[EN TODO] Chicken thigh" }, amount: { ja: "300g", en: "300g" } },
      { name: { ja: "長ねぎ", en: "[EN TODO] Green onion" }, amount: { ja: "1/3本", en: "[EN TODO] 1/3" } },
      { name: { ja: "甲州みそ", en: "[EN TODO] Koshu miso" }, amount: { ja: "大さじ1と1/2", en: "[EN TODO] 1.5 tbsp" } },
      { name: { ja: "砂糖", en: "[EN TODO] Sugar" }, amount: { ja: "小さじ2", en: "[EN TODO] 2 tsp" } },
      { name: { ja: "水", en: "[EN TODO] Water" }, amount: { ja: "大さじ1", en: "[EN TODO] 1 tbsp" } },
      { name: { ja: "すりおろししょうが", en: "[EN TODO] Grated ginger" }, amount: { ja: "小さじ1", en: "[EN TODO] 1 tsp" } },
      { name: { ja: "油", en: "[EN TODO] Oil" }, amount: { ja: "小さじ1", en: "[EN TODO] 1 tsp" } },
    ],
    steps: [
      {
        text: {
          ja: "長ねぎをみじん切りにし、味噌・砂糖・水・しょうがと合わせる。",
          en: "[EN TODO] Mince the green onion and combine with the miso, sugar, water, and ginger.",
        },
      },
      {
        text: {
          ja: "鶏もも肉を観音開きにしてたれを揉み込み、30分冷蔵する。",
          en: "[EN TODO] Butterfly the chicken thigh, rub in the sauce, and refrigerate for 30 minutes.",
        },
      },
      {
        text: {
          ja: "余分なたれを拭き取り、皮目から中弱火で焼く。",
          en: "[EN TODO] Wipe off excess sauce and grill skin-side down over medium-low heat.",
        },
      },
      {
        text: {
          ja: "返して蓋をし、中心温度75℃を1分以上保つまで加熱する(生肉に触れたたれは使い回さない)。",
          en: "[EN TODO] Flip, cover, and cook until the core temperature reaches 75°C for at least 1 minute (do not reuse sauce that touched raw meat).",
        },
      },
    ],
    tip: {
      ja: "焦げやすいたれをぬぐってから焼き、鶏肉の皮に焼き色を付けます。肉は中心温度75℃で1分以上を目安にし、温度計で確認してください。",
      en: "[EN TODO] Wipe off the easily-burnt sauce before grilling to brown the chicken skin. Use a thermometer to confirm the core temperature reaches 75°C for at least 1 minute.",
    },
    image: {
      src: "/images/recipes/tori-negi-miso-yaki.jpg",
      alt: { ja: "鶏もも肉のねぎ味噌焼き", en: "[EN TODO] Grilled Chicken Thigh with Green Onion Miso" },
      width: 1200,
      height: 900,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
  {
    id: "sake-kinoko-miso-butter-foil",
    slug: "sake-kinoko-miso-butter-foil",
    order: 6,
    title: { ja: "鮭ときのこの味噌バターホイル蒸し", en: "[EN TODO] Foil-steamed Salmon and Mushrooms with Miso Butter" },
    productIds: ["rice-miso"],
    tags: ["main"],
    timeMinutes: 25,
    servings: 2,
    difficulty: 2,
    ingredients: [
      { name: { ja: "生鮭", en: "[EN TODO] Fresh salmon" }, amount: { ja: "2切れ", en: "[EN TODO] 2 fillets" } },
      { name: { ja: "しめじ", en: "[EN TODO] Shimeji mushrooms" }, amount: { ja: "80g", en: "80g" } },
      { name: { ja: "玉ねぎ", en: "[EN TODO] Onion" }, amount: { ja: "1/2個", en: "[EN TODO] 1/2" } },
      { name: { ja: "米みそ", en: "[EN TODO] Rice miso" }, amount: { ja: "大さじ1と1/2", en: "[EN TODO] 1.5 tbsp" } },
      { name: { ja: "砂糖", en: "[EN TODO] Sugar" }, amount: { ja: "小さじ1", en: "[EN TODO] 1 tsp" } },
      { name: { ja: "水", en: "[EN TODO] Water" }, amount: { ja: "大さじ2", en: "[EN TODO] 2 tbsp" } },
      { name: { ja: "バター", en: "[EN TODO] Butter" }, amount: { ja: "10g", en: "10g" } },
      { name: { ja: "黒こしょう", en: "[EN TODO] Black pepper" }, amount: { ja: "少々", en: "[EN TODO] A pinch" } },
    ],
    steps: [
      { text: { ja: "味噌・砂糖・水を混ぜる。", en: "[EN TODO] Mix the miso, sugar, and water." } },
      {
        text: {
          ja: "アルミホイル2枚に薄切り玉ねぎ、鮭、しめじの順に重ね、たれとバターを等分にのせて包む。",
          en: "[EN TODO] On two sheets of foil, layer sliced onion, salmon, and shimeji, top evenly with the sauce and butter, and wrap.",
        },
      },
      {
        text: {
          ja: "フライパンに1cm程度の水を張り蓋をして中火にかけ、沸いたら弱火にして12〜15分、鮭の中心に火が通るまで蒸す(途中水量を保つ)。",
          en: "[EN TODO] Add about 1cm of water to a frying pan, cover, heat over medium, then reduce to low and steam for 12-15 minutes until the salmon is cooked through (keep topping up the water).",
        },
      },
    ],
    tip: {
      ja: "蒸し汁も一緒に盛り付け、黒こしょうを少し振ります。ホイルを開く際は、熱い蒸気に注意してください。",
      en: "[EN TODO] Serve together with the steaming liquid and a little black pepper. Be careful of hot steam when opening the foil.",
    },
    image: {
      src: "/images/recipes/sake-kinoko-miso-butter-foil.jpg",
      alt: { ja: "鮭ときのこの味噌バターホイル蒸し", en: "[EN TODO] Foil-steamed Salmon and Mushrooms with Miso Butter" },
      width: 1200,
      height: 900,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
  {
    id: "kabocha-tamanegi-tonyu-miso-potage",
    slug: "kabocha-tamanegi-tonyu-miso-potage",
    order: 7,
    title: { ja: "かぼちゃと玉ねぎの豆乳味噌ポタージュ", en: "[EN TODO] Kabocha and Onion Soy Milk Miso Potage" },
    productIds: ["rice-miso"],
    tags: ["soup", "vegan"],
    timeMinutes: 30,
    servings: 2,
    difficulty: 2,
    ingredients: [
      { name: { ja: "かぼちゃ", en: "[EN TODO] Kabocha squash" }, amount: { ja: "250g", en: "250g" } },
      { name: { ja: "玉ねぎ", en: "[EN TODO] Onion" }, amount: { ja: "1/2個", en: "[EN TODO] 1/2" } },
      { name: { ja: "オリーブ油", en: "[EN TODO] Olive oil" }, amount: { ja: "小さじ2", en: "[EN TODO] 2 tsp" } },
      { name: { ja: "水", en: "[EN TODO] Water" }, amount: { ja: "250mL", en: "250mL" } },
      { name: { ja: "無調整豆乳", en: "[EN TODO] Unsweetened soy milk" }, amount: { ja: "200mL", en: "200mL" } },
      { name: { ja: "米みそ", en: "[EN TODO] Rice miso" }, amount: { ja: "大さじ1〜1と1/2", en: "[EN TODO] 1-1.5 tbsp" } },
      { name: { ja: "黒こしょう", en: "[EN TODO] Black pepper" }, amount: { ja: "少々", en: "[EN TODO] A pinch" } },
    ],
    steps: [
      { text: { ja: "かぼちゃの種を除き薄切りに、玉ねぎも薄切りにする。", en: "[EN TODO] Remove the kabocha seeds and thinly slice it, and thinly slice the onion too." } },
      {
        text: {
          ja: "鍋で油を温め玉ねぎを透き通るまで炒め、かぼちゃと水を加え蓋をして柔らかくなるまで煮る。",
          en: "[EN TODO] Warm the oil in a pot, sauté the onion until translucent, add the kabocha and water, cover, and simmer until soft.",
        },
      },
      { text: { ja: "火を止めてマッシャーで潰すかミキサーにかける。", en: "[EN TODO] Turn off the heat and mash or blend until smooth." } },
      {
        text: {
          ja: "鍋に戻し豆乳を加え、沸かさないよう弱火で温め、味噌を溶き入れ、こしょうで整える。",
          en: "[EN TODO] Return to the pot, add the soy milk, warm gently over low heat without boiling, dissolve in the miso, and season with pepper.",
        },
      },
    ],
    tip: {
      ja: "豆乳を加えた後は、煮立たせずに温めます。なめらかさを優先する場合は、つぶした後に裏ごししてください。",
      en: "[EN TODO] After adding the soy milk, warm it gently without boiling. For extra smoothness, strain it after mashing.",
    },
    image: {
      src: "/images/recipes/kabocha-tamanegi-tonyu-miso-potage.jpg",
      alt: { ja: "かぼちゃと玉ねぎの豆乳味噌ポタージュ", en: "[EN TODO] Kabocha and Onion Soy Milk Miso Potage" },
      width: 880,
      height: 572,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
  {
    id: "tofu-wakame-tamago-miso-soup",
    slug: "tofu-wakame-tamago-miso-soup",
    order: 8,
    title: { ja: "豆腐・わかめ・ふんわり卵の味噌汁", en: "[EN TODO] Tofu, Wakame, and Fluffy Egg Miso Soup" },
    productIds: ["rice-miso"],
    tags: ["soup"],
    timeMinutes: 15,
    servings: 2,
    difficulty: 1,
    ingredients: [
      { name: { ja: "絹ごし豆腐", en: "[EN TODO] Silken tofu" }, amount: { ja: "150g", en: "150g" } },
      { name: { ja: "卵", en: "[EN TODO] Egg" }, amount: { ja: "1個", en: "[EN TODO] 1" } },
      { name: { ja: "乾燥わかめ", en: "[EN TODO] Dried wakame" }, amount: { ja: "2g", en: "2g" } },
      { name: { ja: "青ねぎ", en: "[EN TODO] Green onion" }, amount: { ja: "適量", en: "[EN TODO] As needed" } },
      { name: { ja: "昆布だし", en: "[EN TODO] Kombu dashi" }, amount: { ja: "400mL", en: "400mL" } },
      { name: { ja: "米みそ", en: "[EN TODO] Rice miso" }, amount: { ja: "大さじ1〜1と1/2", en: "[EN TODO] 1-1.5 tbsp" } },
    ],
    steps: [
      { text: { ja: "豆腐を角切りにし、わかめを表示通り戻す。", en: "[EN TODO] Cube the tofu and rehydrate the wakame per package instructions." } },
      { text: { ja: "だしを温め豆腐とわかめを加える。", en: "[EN TODO] Warm the dashi and add the tofu and wakame." } },
      {
        text: {
          ja: "沸いたら溶き卵をゆっくり回し入れ、すぐにはかき混ぜない。",
          en: "[EN TODO] Once boiling, slowly pour in the beaten egg in a circular motion, and don't stir right away.",
        },
      },
      { text: { ja: "卵に火が通ったら弱火にし、味噌を溶き入れ青ねぎを散らす。", en: "[EN TODO] Once the egg is cooked, lower the heat, dissolve in the miso, and sprinkle with green onion." } },
    ],
    tip: {
      ja: "卵を入れた直後はかき混ぜず、固まってから軽くほぐします。仕上げに味噌を加える構成です。",
      en: "[EN TODO] Don't stir right after adding the egg — gently break it up once it has set. The miso is added at the very end.",
    },
    image: {
      src: "/images/recipes/tofu-wakame-tamago-miso-soup.jpg",
      alt: { ja: "豆腐・わかめ・ふんわり卵の味噌汁", en: "[EN TODO] Tofu, Wakame, and Fluffy Egg Miso Soup" },
      width: 880,
      height: 572,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
  {
    id: "mushi-dori-gomamiso-dare",
    slug: "mushi-dori-gomamiso-dare",
    order: 9,
    title: { ja: "蒸し鶏と温野菜のごま味噌だれ", en: "[EN TODO] Steamed Chicken and Warm Vegetables with Sesame Miso Sauce" },
    productIds: ["rice-miso"],
    tags: ["main"],
    timeMinutes: 30,
    servings: 2,
    difficulty: 2,
    ingredients: [
      { name: { ja: "鶏むね肉", en: "[EN TODO] Chicken breast" }, amount: { ja: "250g", en: "250g" } },
      { name: { ja: "ブロッコリー", en: "[EN TODO] Broccoli" }, amount: { ja: "150g", en: "150g" } },
      { name: { ja: "にんじん", en: "[EN TODO] Carrot" }, amount: { ja: "1/2本", en: "[EN TODO] 1/2" } },
      { name: { ja: "塩", en: "[EN TODO] Salt" }, amount: { ja: "少々", en: "[EN TODO] A pinch" } },
      { name: { ja: "米みそ(たれ用)", en: "[EN TODO] Rice miso (for sauce)" }, amount: { ja: "大さじ1", en: "[EN TODO] 1 tbsp" } },
      { name: { ja: "白すりごま", en: "[EN TODO] Ground white sesame" }, amount: { ja: "大さじ1", en: "[EN TODO] 1 tbsp" } },
      { name: { ja: "砂糖", en: "[EN TODO] Sugar" }, amount: { ja: "小さじ1", en: "[EN TODO] 1 tsp" } },
      { name: { ja: "米酢", en: "[EN TODO] Rice vinegar" }, amount: { ja: "小さじ1", en: "[EN TODO] 1 tsp" } },
      { name: { ja: "水", en: "[EN TODO] Water" }, amount: { ja: "大さじ1", en: "[EN TODO] 1 tbsp" } },
    ],
    steps: [
      {
        text: {
          ja: "鶏むね肉を観音開きにし軽く塩をして、中心温度75℃まで蒸す。",
          en: "[EN TODO] Butterfly the chicken breast, lightly salt it, and steam until the core temperature reaches 75°C.",
        },
      },
      { text: { ja: "ブロッコリーと薄切りにんじんを別に蒸す。", en: "[EN TODO] Steam the broccoli and thinly sliced carrot separately." } },
      { text: { ja: "たれの材料を混ぜる。", en: "[EN TODO] Mix together the sauce ingredients." } },
      {
        text: {
          ja: "鶏肉を少し冷まして切り分け、野菜とたれを添えて盛り付ける。生肉に触れた器具は使う前に洗う。",
          en: "[EN TODO] Let the chicken cool slightly, slice it, and plate with the vegetables and sauce. Wash any utensils that touched raw meat before reuse.",
        },
      },
    ],
    tip: {
      ja: "たれは水を少しずつ加え、好みのとろみに整えます。鶏肉は中心温度75℃で1分以上を目安に、温度計で確認してください。",
      en: "[EN TODO] Add the water to the sauce little by little to reach your preferred thickness. Use a thermometer to confirm the chicken's core temperature reaches 75°C for at least 1 minute.",
    },
    image: {
      src: "/images/recipes/mushi-dori-gomamiso-dare.jpg",
      alt: { ja: "蒸し鶏と温野菜のごま味噌だれ", en: "[EN TODO] Steamed Chicken and Warm Vegetables with Sesame Miso Sauce" },
      width: 880,
      height: 572,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
  {
    id: "kinoko-miso-cream-pasta",
    slug: "kinoko-miso-cream-pasta",
    order: 10,
    title: { ja: "きのこの味噌クリームパスタ", en: "[EN TODO] Mushroom Miso Cream Pasta" },
    productIds: ["rice-miso"],
    tags: ["main"],
    timeMinutes: 25,
    servings: 2,
    difficulty: 2,
    ingredients: [
      { name: { ja: "スパゲッティ", en: "[EN TODO] Spaghetti" }, amount: { ja: "160g", en: "160g" } },
      { name: { ja: "しめじ", en: "[EN TODO] Shimeji mushrooms" }, amount: { ja: "100g", en: "100g" } },
      { name: { ja: "まいたけ", en: "[EN TODO] Maitake mushrooms" }, amount: { ja: "100g", en: "100g" } },
      { name: { ja: "玉ねぎ", en: "[EN TODO] Onion" }, amount: { ja: "1/4個", en: "[EN TODO] 1/4" } },
      { name: { ja: "にんにく", en: "[EN TODO] Garlic" }, amount: { ja: "1/2片", en: "[EN TODO] 1/2 clove" } },
      { name: { ja: "オリーブ油", en: "[EN TODO] Olive oil" }, amount: { ja: "大さじ1", en: "[EN TODO] 1 tbsp" } },
      { name: { ja: "牛乳", en: "[EN TODO] Milk" }, amount: { ja: "200mL", en: "200mL" } },
      { name: { ja: "生クリーム", en: "[EN TODO] Heavy cream" }, amount: { ja: "50mL", en: "50mL" } },
      { name: { ja: "米みそ", en: "[EN TODO] Rice miso" }, amount: { ja: "大さじ1", en: "[EN TODO] 1 tbsp" } },
      { name: { ja: "黒こしょう", en: "[EN TODO] Black pepper" }, amount: { ja: "少々", en: "[EN TODO] A pinch" } },
      { name: { ja: "塩(ゆで湯用)", en: "[EN TODO] Salt (for boiling water)" }, amount: { ja: "適量", en: "[EN TODO] As needed" } },
    ],
    steps: [
      { text: { ja: "パスタを表示通り茹で、ゆで汁を少し取っておく。", en: "[EN TODO] Boil the pasta per package instructions, reserving a little of the cooking water." } },
      {
        text: {
          ja: "フライパンでにんにくと油を温め、薄切り玉ねぎときのこを炒める。",
          en: "[EN TODO] Warm the garlic and oil in a frying pan, and sauté the sliced onion and mushrooms.",
        },
      },
      { text: { ja: "牛乳と生クリームを加え弱火で温める。味噌を少量のたれで溶いてから加える。", en: "[EN TODO] Add the milk and cream and warm over low heat. Dissolve the miso in a little liquid before adding." } },
      { text: { ja: "パスタを加え、ゆで汁で濃度を調整し、こしょうで整える。", en: "[EN TODO] Add the pasta, adjust the consistency with the reserved cooking water, and season with pepper." } },
    ],
    tip: {
      ja: "きのこを入れたら、焼き色が少し付くまで動かしすぎないようにします。味噌を加えた後は、強く煮詰めない仕上げです。",
      en: "[EN TODO] Once the mushrooms are added, avoid stirring too much until they pick up some color. After adding the miso, finish without reducing it too hard.",
    },
    image: {
      src: "/images/recipes/kinoko-miso-cream-pasta.jpg",
      alt: { ja: "きのこの味噌クリームパスタ", en: "[EN TODO] Mushroom Miso Cream Pasta" },
      width: 1200,
      height: 900,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
  {
    id: "oba-goma-onigiri-kinzanji",
    slug: "oba-goma-onigiri-kinzanji",
    order: 11,
    title: { ja: "大葉とごまの具だくさんおにぎり", en: "[EN TODO] Shiso and Sesame Rice Balls" },
    productIds: ["kinzanji-miso"],
    tags: ["snack"],
    timeMinutes: 15,
    servings: 2,
    difficulty: 1,
    ingredients: [
      { name: { ja: "温かいごはん", en: "[EN TODO] Warm cooked rice" }, amount: { ja: "300g", en: "300g" } },
      { name: { ja: "金山寺みそ", en: "[EN TODO] Kinzanji miso" }, amount: { ja: "30g", en: "30g" } },
      { name: { ja: "大葉", en: "[EN TODO] Shiso leaves" }, amount: { ja: "4枚", en: "[EN TODO] 4 leaves" } },
      { name: { ja: "白いりごま", en: "[EN TODO] Toasted white sesame seeds" }, amount: { ja: "小さじ2", en: "[EN TODO] 2 tsp" } },
      { name: { ja: "焼きのり", en: "[EN TODO] Roasted nori" }, amount: { ja: "適量", en: "[EN TODO] As needed" } },
    ],
    steps: [
      { text: { ja: "大葉を細切りにする。", en: "[EN TODO] Cut the shiso leaves into thin strips." } },
      {
        text: {
          ja: "温かいごはんに味噌・大葉・ごまを優しく混ぜ、4個のおにぎりに握り、好みでのりを巻く。",
          en: "[EN TODO] Gently mix the miso, shiso, and sesame into the warm rice, shape into 4 rice balls, and wrap with nori if desired.",
        },
      },
      {
        text: {
          ja: "最初は塩を加えず、味見してから必要最小限に調整する。",
          en: "[EN TODO] Don't add salt at first — taste it and adjust only as minimally as needed.",
        },
      },
    ],
    tip: {
      ja: "味噌を均一に練り込まず、ところどころに具が残るように混ぜます。手や器具を清潔にし、作った後は早めに食べてください。",
      en: "[EN TODO] Don't mix the miso in uniformly — leave bits of it scattered through the rice. Keep hands and utensils clean, and eat soon after making.",
    },
    image: {
      src: "/images/recipes/oba-goma-onigiri-kinzanji.jpg",
      alt: { ja: "大葉とごまの具だくさんおにぎり", en: "[EN TODO] Shiso and Sesame Rice Balls" },
      width: 880,
      height: 572,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
  {
    id: "yaki-nasu-miso-cheese",
    slug: "yaki-nasu-miso-cheese",
    order: 12,
    title: { ja: "焼きなすの味噌チーズのせ", en: "[EN TODO] Grilled Eggplant with Miso Cheese" },
    productIds: ["kinzanji-miso"],
    tags: ["side"],
    timeMinutes: 20,
    servings: 2,
    difficulty: 2,
    ingredients: [
      { name: { ja: "なす", en: "[EN TODO] Eggplant" }, amount: { ja: "2本", en: "[EN TODO] 2" } },
      { name: { ja: "金山寺みそ", en: "[EN TODO] Kinzanji miso" }, amount: { ja: "40g", en: "40g" } },
      { name: { ja: "ピザ用チーズ", en: "[EN TODO] Shredded pizza cheese" }, amount: { ja: "40g", en: "40g" } },
      { name: { ja: "油", en: "[EN TODO] Oil" }, amount: { ja: "大さじ1", en: "[EN TODO] 1 tbsp" } },
      { name: { ja: "大葉", en: "[EN TODO] Shiso leaves" }, amount: { ja: "2枚", en: "[EN TODO] 2 leaves" } },
    ],
    steps: [
      { text: { ja: "なすを縦半分に切り、切り口に浅く格子状の切れ込みを入れる。", en: "[EN TODO] Cut the eggplant in half lengthwise and score the cut side shallowly in a crosshatch pattern." } },
      {
        text: {
          ja: "フライパンで油を熱し切り口を下にして焼き、返して蓋をし柔らかくなるまで焼く。",
          en: "[EN TODO] Heat oil in a frying pan and grill cut-side down, then flip, cover, and cook until soft.",
        },
      },
      {
        text: {
          ja: "切り口を上にして味噌とチーズをのせ、再度蓋をしてチーズを溶かし、刻んだ大葉を散らす。",
          en: "[EN TODO] Turn cut-side up, top with the miso and cheese, cover again to melt the cheese, and sprinkle with chopped shiso.",
        },
      },
    ],
    tip: {
      ja: "なすを十分やわらかくしてから味噌をのせます。金山寺みその具材をつぶさずに仕上げます。",
      en: "[EN TODO] Make sure the eggplant is fully softened before topping with the miso. Finish without crushing the kinzanji miso's chunky ingredients.",
    },
    image: {
      src: "/images/recipes/yaki-nasu-miso-cheese.jpg",
      alt: { ja: "焼きなすの味噌チーズのせ", en: "[EN TODO] Grilled Eggplant with Miso Cheese" },
      width: 1200,
      height: 900,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
  {
    id: "avocado-hiya-yakko-kinzanji",
    slug: "avocado-hiya-yakko-kinzanji",
    order: 13,
    title: { ja: "アボカド冷ややっこ", en: "[EN TODO] Chilled Tofu with Avocado and Kinzanji Miso" },
    productIds: ["kinzanji-miso"],
    tags: ["side"],
    timeMinutes: 10,
    servings: 2,
    difficulty: 1,
    ingredients: [
      { name: { ja: "絹ごし豆腐", en: "[EN TODO] Silken tofu" }, amount: { ja: "300g", en: "300g" } },
      { name: { ja: "アボカド", en: "[EN TODO] Avocado" }, amount: { ja: "1/2個", en: "[EN TODO] 1/2" } },
      { name: { ja: "金山寺みそ", en: "[EN TODO] Kinzanji miso" }, amount: { ja: "30g", en: "30g" } },
      { name: { ja: "レモン汁", en: "[EN TODO] Lemon juice" }, amount: { ja: "小さじ1", en: "[EN TODO] 1 tsp" } },
      { name: { ja: "ごま油", en: "[EN TODO] Sesame oil" }, amount: { ja: "小さじ1", en: "[EN TODO] 1 tsp" } },
      { name: { ja: "刻みのり", en: "[EN TODO] Shredded nori" }, amount: { ja: "適量", en: "[EN TODO] As needed" } },
    ],
    steps: [
      { text: { ja: "豆腐を軽く水切りし半分に切る。", en: "[EN TODO] Lightly drain the tofu and cut it in half." } },
      { text: { ja: "アボカドを角切りにしレモン汁と和え豆腐にのせる。", en: "[EN TODO] Cube the avocado, toss with lemon juice, and place on top of the tofu." } },
      { text: { ja: "味噌を別添えにしごま油を垂らし、のりを散らす。", en: "[EN TODO] Serve the miso alongside, drizzle with sesame oil, and sprinkle with nori." } },
    ],
    tip: {
      ja: "醤油を足さず、まずは金山寺みそだけの塩気で食べます。豆腐・アボカド・味噌を一緒にすくう食べ方です。",
      en: "[EN TODO] Try it first with just the kinzanji miso's saltiness, without adding soy sauce. Scoop up the tofu, avocado, and miso together.",
    },
    image: {
      src: "/images/recipes/avocado-hiya-yakko-kinzanji.jpg",
      alt: { ja: "アボカド冷ややっこ", en: "[EN TODO] Chilled Tofu with Avocado and Kinzanji Miso" },
      width: 880,
      height: 572,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
  {
    id: "shinjaga-misomayo-salad",
    slug: "shinjaga-misomayo-salad",
    order: 14,
    title: { ja: "新じゃがの味噌マヨサラダ", en: "[EN TODO] New Potato Miso Mayo Salad" },
    productIds: ["kinzanji-miso"],
    tags: ["side"],
    timeMinutes: 20,
    servings: 2,
    difficulty: 1,
    ingredients: [
      { name: { ja: "じゃがいも", en: "[EN TODO] Potato" }, amount: { ja: "250g", en: "250g" } },
      { name: { ja: "きゅうり", en: "[EN TODO] Cucumber" }, amount: { ja: "1/2本", en: "[EN TODO] 1/2" } },
      { name: { ja: "金山寺みそ", en: "[EN TODO] Kinzanji miso" }, amount: { ja: "30g", en: "30g" } },
      { name: { ja: "マヨネーズ", en: "[EN TODO] Mayonnaise" }, amount: { ja: "大さじ1と1/2", en: "[EN TODO] 1.5 tbsp" } },
      { name: { ja: "米酢", en: "[EN TODO] Rice vinegar" }, amount: { ja: "小さじ1", en: "[EN TODO] 1 tsp" } },
      { name: { ja: "黒こしょう", en: "[EN TODO] Black pepper" }, amount: { ja: "少々", en: "[EN TODO] A pinch" } },
    ],
    steps: [
      { text: { ja: "じゃがいもを角切りにして茹で、温かいうちに酢と和える。", en: "[EN TODO] Cube the potatoes, boil them, and toss with vinegar while still warm." } },
      { text: { ja: "きゅうりを薄切りにし水気を拭く。", en: "[EN TODO] Thinly slice the cucumber and pat dry." } },
      {
        text: {
          ja: "じゃがいもが少し冷めたら味噌・マヨネーズ・きゅうりと和え、こしょうで整える。",
          en: "[EN TODO] Once the potatoes have cooled slightly, toss with the miso, mayonnaise, and cucumber, and season with pepper.",
        },
      },
    ],
    tip: {
      ja: "じゃがいもは全部つぶさず、少し形を残します。金山寺みその具材感と合わせて楽しむサラダです。",
      en: "[EN TODO] Don't mash all the potatoes — leave some texture. A salad meant to be enjoyed alongside the kinzanji miso's chunky ingredients.",
    },
    image: {
      src: "/images/recipes/shinjaga-misomayo-salad.jpg",
      alt: { ja: "新じゃがの味噌マヨサラダ", en: "[EN TODO] New Potato Miso Mayo Salad" },
      width: 880,
      height: 572,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
  {
    id: "mushidori-kyuri-lettuce-wrap",
    slug: "mushidori-kyuri-lettuce-wrap",
    order: 15,
    title: { ja: "蒸し鶏ときゅうりのレタス包み", en: "[EN TODO] Lettuce Wraps with Steamed Chicken and Cucumber" },
    productIds: ["kinzanji-miso"],
    tags: ["main"],
    timeMinutes: 25,
    servings: 2,
    difficulty: 2,
    ingredients: [
      { name: { ja: "鶏むね肉", en: "[EN TODO] Chicken breast" }, amount: { ja: "200g", en: "200g" } },
      { name: { ja: "きゅうり", en: "[EN TODO] Cucumber" }, amount: { ja: "1本", en: "[EN TODO] 1" } },
      { name: { ja: "レタス", en: "[EN TODO] Lettuce" }, amount: { ja: "4〜6枚", en: "[EN TODO] 4-6 leaves" } },
      { name: { ja: "金山寺みそ", en: "[EN TODO] Kinzanji miso" }, amount: { ja: "40g", en: "40g" } },
      { name: { ja: "白すりごま", en: "[EN TODO] Ground white sesame" }, amount: { ja: "小さじ2", en: "[EN TODO] 2 tsp" } },
      { name: { ja: "ごま油", en: "[EN TODO] Sesame oil" }, amount: { ja: "小さじ1", en: "[EN TODO] 1 tsp" } },
      { name: { ja: "水", en: "[EN TODO] Water" }, amount: { ja: "小さじ1〜2", en: "[EN TODO] 1-2 tsp" } },
      { name: { ja: "塩", en: "[EN TODO] Salt" }, amount: { ja: "少々", en: "[EN TODO] A pinch" } },
    ],
    steps: [
      {
        text: {
          ja: "鶏むね肉を観音開きにし塩をして、中心温度75℃まで蒸す。少し冷まして細かくほぐす。",
          en: "[EN TODO] Butterfly the chicken breast, salt it, and steam until the core temperature reaches 75°C. Let cool slightly and shred finely.",
        },
      },
      { text: { ja: "きゅうりを千切りにしほぐした鶏肉と混ぜる。", en: "[EN TODO] Cut the cucumber into thin strips and mix with the shredded chicken." } },
      { text: { ja: "味噌・ごま・ごま油・水を合わせてたれを作る。", en: "[EN TODO] Combine the miso, sesame, sesame oil, and water to make the sauce." } },
      {
        text: {
          ja: "レタスを洗って水気を切る。具材とたれは別盛りにし、食べる直前に包む。",
          en: "[EN TODO] Wash the lettuce and drain well. Plate the filling and sauce separately, wrapping just before eating.",
        },
      },
    ],
    tip: {
      ja: "具材とたれは別々に盛り付け、食べる直前に包みます。鶏肉は中心温度75℃で1分以上を目安に、温度計で確認してください。",
      en: "[EN TODO] Plate the filling and sauce separately, wrapping just before eating. Use a thermometer to confirm the chicken's core temperature reaches 75°C for at least 1 minute.",
    },
    image: {
      src: "/images/recipes/mushidori-kyuri-lettuce-wrap.jpg",
      alt: { ja: "蒸し鶏ときゅうりのレタス包み", en: "[EN TODO] Lettuce Wraps with Steamed Chicken and Cucumber" },
      width: 880,
      height: 572,
      isPlaceholder: false,
    },
    confidence: "confirmed",
  },
];
