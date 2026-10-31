import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Recipe } from "@/types/recipe";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface RecipeCardProps {
  recipe: Recipe;
  locale: Locale;
  dict: Dictionary;
  className?: string;
}

export function RecipeCard({ recipe, locale, dict, className = "" }: RecipeCardProps) {
  const d = dict.recipe;
  const isVegan = recipe.tags.includes("vegan");

  return (
    <Link href={`/${locale}/recipes/${recipe.slug}`} className={`block ${className}`}>
      <Card className="h-full hover:border-miso transition-colors">
        {recipe.image ? (
          <Image
            src={recipe.image.src}
            alt={recipe.image.alt[locale]}
            width={recipe.image.width}
            height={recipe.image.height}
            className="aspect-[4/3] h-auto w-full rounded border border-miso-light/30 object-cover sm:aspect-[16/10]"
          />
        ) : (
          <div
            role="img"
            aria-label={d.noImageAlt}
            className="flex aspect-[4/3] w-full items-center justify-center rounded border border-miso-light/30 bg-miso-light/40 p-3 text-center sm:aspect-[16/10]"
          >
            <span className="font-heading text-lg text-koshu">{recipe.title[locale]}</span>
          </div>
        )}
        <h3 className="mt-3 text-[20px]">{recipe.title[locale]}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge tone="neutral">
            {recipe.timeMinutes}
            {d.minutesUnit}
          </Badge>
          {recipe.tags.map((tag) => (
            <Badge key={tag} tone={tag === "vegan" ? "warning" : "neutral"}>
              {d.tags[tag]}
            </Badge>
          ))}
        </div>
        {isVegan && (
          <p className="mt-2 text-sm text-fukamidori-dark">{d.veganBadge}</p>
        )}
      </Card>
    </Link>
  );
}
