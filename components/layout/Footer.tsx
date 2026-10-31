import type { Dictionary } from "@/lib/i18n/dictionaries";

interface FooterProps {
  dict: Dictionary;
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="border-t border-miso-light/30 bg-kinari-deep">
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-sumi-soft sm:px-6">
        <p>&copy; {dict.footer.copyright}</p>
      </div>
    </footer>
  );
}
