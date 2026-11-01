import type { IllustName } from "@/lib/illust/mapping";

export const ILLUST_PATHS: Record<IllustName, JSX.Element> = {
  soupBowl: (
    <g fill="none" stroke="var(--illust-ink)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M25 13c-2.4 3.1-.4 4.6 0 7.3" strokeWidth="1.3" opacity=".75" />
      <path d="M33 9.5c-2.8 3.6-.6 5.4 0 8.6" strokeWidth="1.3" opacity=".75" />
      <path d="M41 13.4c-2.3 3-.5 4.5-.1 7.2" strokeWidth="1.3" opacity=".75" />
      <path d="M15.4 28.6c4.6-2.1 11-3.1 16.9-3.1 6 0 12.2 1 16.6 3-4.1 2.4-10.3 3.6-16.7 3.6-6.5 0-12.8-1.2-16.8-3.5z" fill="var(--illust-warm)" stroke="none" />
      <path d="M14.8 27.9c0-2.6 7.7-4.3 17.3-4.3 9.7 0 17.4 1.8 17.4 4.5 0 2.6-7.8 4.5-17.5 4.4-9.5 0-17.2-2-17.2-4.6z" strokeWidth="2" />
      <path d="M16.3 30.1c1.6 9.6 6.4 16.6 15.6 16.8 9.3.2 14.4-7 16.1-16.9" strokeWidth="2" />
      <path d="M45.6 33.6c-1.1 4.4-3 8-5.8 10.4" strokeWidth="1.2" opacity=".5" />
      <path d="M26.6 47.1l-1.5 4.3h14.1l-1.4-4.3" strokeWidth="1.7" />
      <path d="M23.9 51.6h16.6" strokeWidth="2" />
      <path d="M27.6 27.4c1.9-.5 3.6-.2 3.8.8.2 1-1.3 1.9-3.2 2-1.8.1-3.1-.5-3-1.4.1-.8 1-1.2 2.4-1.4z" fill="var(--illust-leaf)" stroke="none" />
      <path d="M36.6 28.9c1.7-.4 3.2-.1 3.3.7.1.8-1.2 1.6-2.8 1.7-1.6.1-2.7-.4-2.6-1.2.1-.7.8-1 2.1-1.2z" fill="var(--illust-leaf)" stroke="none" />
    </g>
  ),
  onigiri: (
    <g fill="none" stroke="var(--illust-ink)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M31.8 13.2c1.6 0 2.7 1 3.6 2.5l13.4 23c1.5 2.6.4 4.7-2.6 4.8l-27.8.3c-3.1 0-4.3-2-2.8-4.7l13.3-23.2c.9-1.6 1.6-2.7 2.9-2.7z" fill="var(--illust-cream)" stroke="none" />
      <path d="M26.4 29.1c2.5-1.6 5.6-2 8.2-.7" stroke="var(--illust-blush)" strokeWidth="1.6" opacity=".8" />
      <path d="M23.2 34.9c4-2.1 9.6-2.4 13.8-.6" stroke="var(--illust-blush)" strokeWidth="1.6" opacity=".7" />
      <path d="M21.6 38.7h21.1l1.8 3.2-24.9.2z" fill="var(--illust-ink)" stroke="none" opacity=".85" />
      <path d="M31.6 12.9c1.7.1 2.8 1.2 3.7 2.8l13.3 22.8c1.5 2.7.3 4.8-2.8 4.9l-27.5.3c-3.2 0-4.4-2.1-2.9-4.8L28.6 15.8c1-1.7 1.7-2.9 3-2.9z" strokeWidth="2" />
      <path d="M27.3 18.4L18.9 33.1" strokeWidth="1.1" opacity=".45" />
    </g>
  ),
  hotpot: (
    <g fill="none" stroke="var(--illust-ink)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M27 10.4c-2.1 2.7-.4 4-.1 6.5" strokeWidth="1.3" opacity=".75" />
      <path d="M36.2 8.3c-2.4 3-.5 4.5 0 7.2" strokeWidth="1.3" opacity=".75" />
      <path d="M30.6 16.4c.3-1.7 1.6-2.4 2.9-1.9 1.2.5 1.3 2 .3 3.1-1 1.1-2.4 1-3-.2z" fill="var(--illust-ink)" stroke="none" opacity=".8" />
      <path d="M14.6 23.8c0-2.4 7.8-4.1 17.4-4.1 9.7 0 17.5 1.7 17.5 4.2 0 2.4-7.9 4.2-17.6 4.1-9.4 0-17.3-1.9-17.3-4.2z" strokeWidth="2" />
      <path d="M16.3 25.6c-1 7.1.4 14.6 4.4 19.6 3.1 3.9 7.4 5.8 11.6 5.8 4.3 0 8.7-2 11.8-6 3.9-5 5.3-12.3 4.3-19.3" strokeWidth="2" />
      <path d="M14.3 27.4c-3.1.3-5.1 2-4.9 4 .2 2 3 3.1 5.3 2.8" strokeWidth="1.7" />
      <path d="M49.4 27.1c3.2.2 5.2 1.8 5.1 3.8-.1 2-2.6 3.3-5.3 3.2" strokeWidth="1.7" />
      <path d="M24.1 24.7c1.9-1.2 4.1-1 5 .4.8 1.3-.2 2.8-2.2 3-1.9.2-3.5-.7-3.7-1.9-.1-.6.1-1.1.9-1.5z" fill="var(--illust-blush)" stroke="none" />
      <path d="M35.9 25.3c1.4-1.4 3.4-1.3 4.1.1.6 1.3-.7 2.6-2.4 2.8-1.6.2-3-.6-3.1-1.7-.1-.5.3-.9 1.4-1.2z" fill="var(--illust-cream)" strokeWidth="1.1" />
      <path d="M15.8 24.3c4.6-2.1 11-3.2 16.9-3.1" strokeWidth="1.1" opacity=".5" />
    </g>
  ),
  stirfry: (
    <g fill="none" stroke="var(--illust-ink)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M29 16c-2.3 2.9-.4 4.3 0 6.9" strokeWidth="1.3" opacity=".75" />
      <path d="M36.4 14.3c-2.5 3.2-.5 4.7 0 7.6" strokeWidth="1.3" opacity=".75" />
      <path d="M10.4 32c4.9-2.6 12.6-3.9 21-3.8 8.3 0 15.8 1.4 20.3 4-4.6 2.7-12.2 4.1-20.5 4-8.2 0-15.8-1.5-20.8-4.2z" strokeWidth="2" />
      <path d="M16 32.3c4.2-1.6 9.6-2.4 15.3-2.3 5.8 0 11 .9 15.1 2.4-4 1.8-9.5 2.8-15.2 2.7-5.6 0-10.9-1-15.2-2.8z" fill="var(--illust-warm)" stroke="none" />
      <path d="M51.8 33.1c3.8-.3 7.3-1 9.6-2.4" strokeWidth="1.7" />
      <path d="M52.2 35.6c3.6.1 7-.4 9.3-1.7" strokeWidth="1.3" opacity=".5" />
      <path d="M22.4 31.6c1.7-1.1 3.7-.9 4.3.5.5 1.2-.7 2.5-2.4 2.7-1.6.2-2.9-.6-3-1.7 0-.5.3-1 1.1-1.5z" fill="var(--illust-leaf)" stroke="none" />
      <path d="M31.6 33.4c1.9-1 4-.6 4.5.8.4 1.2-.9 2.4-2.7 2.5-1.7.1-3-.7-3-1.8 0-.6.4-1 1.2-1.5z" fill="var(--illust-blush)" stroke="none" />
      <path d="M39.4 31.2c1.6-.9 3.4-.6 3.8.6.4 1.1-.7 2.2-2.3 2.3-1.5.1-2.7-.6-2.8-1.6 0-.5.4-.9 1.3-1.3z" fill="var(--illust-cream)" strokeWidth="1.1" />
      <path d="M11.6 31.4c4.5-2.3 11.4-3.6 19-3.6" strokeWidth="1.1" opacity=".5" />
    </g>
  ),
  riceBowl: (
    <g fill="none" stroke="var(--illust-ink)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.2 30.4c0-2.3 7.4-3.9 16.6-3.9 9.3 0 16.8 1.7 16.8 4 0 2.3-7.6 4-16.9 3.9-9.1 0-16.5-1.7-16.5-4z" strokeWidth="2" />
      <path d="M16.6 32.5c1.3 8.4 6 14.8 14.9 15 9 .2 13.9-6.3 15.5-14.9" strokeWidth="2" />
      <path d="M26.4 47.3l-1 3.2h12.6l-.9-3.2" strokeWidth="1.7" />
      <path d="M20.3 29.6c2-4 6.6-6.4 11.4-6.3 4.9.1 9.3 2.6 11.1 6.6-3.7 1.7-7.6 2.6-11.3 2.5-3.8 0-7.5-1-11.2-2.8z" fill="var(--illust-cream)" strokeWidth="1.3" />
      <path d="M26 27.4c.6-.7 1.4-.9 1.8-.4" strokeWidth="1.1" opacity=".5" />
      <path d="M35.8 27.9c.7-.6 1.5-.6 1.8-.1" strokeWidth="1.1" opacity=".5" />
      <path d="M36.6 24.6c1.8-1.3 4-1.1 4.6.5.5 1.3-.8 2.7-2.7 2.9-1.8.2-3.3-.7-3.4-1.9 0-.6.4-1.1 1.5-1.5z" fill="var(--illust-warm)" strokeWidth="1.3" />
      <path d="M17.8 33.1c1.2 7.3 5.3 13 12.7 13.9" strokeWidth="1.1" opacity=".45" />
    </g>
  ),
  cucumber: (
    <g fill="none" stroke="var(--illust-ink)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.6 42.3c0-2 7.6-3.4 16.9-3.4 9.4 0 17 1.4 17 3.4 0 2-7.7 3.5-17.1 3.4-9.2 0-16.8-1.4-16.8-3.4z" strokeWidth="2" />
      <path d="M20.4 41.8c2.7-1.1 6.8-1.7 11.1-1.6 4.4 0 8.3.7 10.9 1.7-2.6 1-6.6 1.6-10.9 1.5-4.2 0-8.3-.6-11.1-1.6z" fill="var(--illust-warm)" stroke="none" />
      <path d="M23.1 15.9c.6-1.1 1.7-1.6 2.5-1 .9.6 1 2 .5 3.3l-1.6 19.3c-.1 1.3-.9 2.1-1.8 1.9-.9-.2-1.4-1.2-1.3-2.5z" strokeWidth="2" />
      <path d="M31.4 17.6c.5-1.1 1.6-1.6 2.4-1 .9.6 1.1 2 .7 3.2l-2.3 18.6c-.2 1.3-1 2-1.9 1.8-.9-.3-1.3-1.3-1.1-2.6z" strokeWidth="2" />
      <path d="M24.1 22.4c.6-.1 1.2 0 1.6.3" strokeWidth="1.3" opacity=".6" />
      <path d="M32.3 24.6c.6-.1 1.2.1 1.5.4" strokeWidth="1.3" opacity=".6" />
      <path d="M23.6 18c.3 6.2.1 12.6-.5 18.4-.4-5.8-.5-12.1-.1-18.2z" fill="var(--illust-leaf)" stroke="none" />
      <path d="M24.2 16.6c.4-.6 1-.9 1.6-.8" strokeWidth="1.1" opacity=".5" />
    </g>
  ),
  tofu: (
    <g fill="none" stroke="var(--illust-ink)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.6 24.3l13.4-5.1 13.6 5-13.3 5.2z" fill="var(--illust-cream)" strokeWidth="2" />
      <path d="M18.6 24.3l13.4 5.2.2 14.3-13.5-5.3z" fill="var(--illust-cream)" strokeWidth="2" />
      <path d="M45.6 24.2l-13.6 5.3-.2 14.3 13.7-5.4z" fill="var(--illust-cream)" strokeWidth="2" />
      <path d="M27.6 22.4c2.1-.9 4.5-.4 5 .9.4 1.1-1 2.1-3.1 2.3-2 .2-3.7-.6-3.8-1.7-.1-.5.3-1 1.9-1.5z" fill="var(--illust-warm)" strokeWidth="1.3" />
      <path d="M30.1 23.1c.5-.3 1 0 1 .4" strokeWidth="1.1" opacity=".6" />
      <path d="M33.8 22.6c.5-.2.9.1.9.5" strokeWidth="1.1" opacity=".6" />
      <path d="M19.4 29.8l12.8 5" strokeWidth="1.3" opacity=".5" />
      <path d="M19.2 24.6l12.6 4.9" strokeWidth="1.1" opacity=".45" />
    </g>
  ),
  plate: (
    <g fill="none" stroke="var(--illust-ink)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.4 38.2c0-3.4 10.2-5.7 22.6-5.7 12.6 0 22.8 2.3 22.8 5.8 0 3.4-10.3 5.9-22.9 5.8-12.3 0-22.5-2.4-22.5-5.9z" strokeWidth="2" />
      <path d="M15.8 38c0-2.1 7.2-3.7 16.2-3.7 9.1 0 16.4 1.7 16.4 3.8 0 2.1-7.3 3.8-16.5 3.7-8.9 0-16.1-1.7-16.1-3.8z" strokeWidth="1.7" />
      <path d="M22.6 35.8c2.8-2.3 7-2.7 9.8-.8 2.6 1.8 2.3 4.7-.7 6.2-3 1.5-7.1 1.1-9.5-1-2-1.7-1.9-3.1.4-4.4z" fill="var(--illust-blush)" strokeWidth="1.7" />
      <path d="M25.4 37.6c1.7-.4 3.6-.2 5 .5" strokeWidth="1.1" opacity=".5" />
      <path d="M37.4 36.9c1.9-1.4 4.3-1.3 5 .3.6 1.3-.8 2.8-2.9 3.2-2 .4-3.9-.3-4.2-1.7-.1-.6.3-1.2 2.1-1.8z" fill="var(--illust-leaf)" strokeWidth="1.3" />
      <path d="M40.9 39.6c1.4-.8 3-.5 3.4.6.4 1-.6 2-2 2.2-1.3.2-2.5-.4-2.6-1.3 0-.5.3-1 1.2-1.5z" fill="var(--illust-leaf)" opacity=".85" strokeWidth="1.1" />
    </g>
  ),
  kobachi: (
    <g fill="none" stroke="var(--illust-ink)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.8 33.6c0-2.5 8.1-4.2 18.1-4.2 10.1 0 18.3 1.8 18.3 4.3 0 2.5-8.3 4.4-18.4 4.3-9.9 0-18-2-18-4.4z" strokeWidth="2" />
      <path d="M15.3 35.8c1.4 7.8 6.5 13.5 16.3 13.7 9.9.2 15.2-5.7 16.9-13.6" strokeWidth="2" />
      <path d="M27.9 49.3l-1 3.1h11.9l-.9-3.1" strokeWidth="1.7" />
      <path d="M20.6 32.1c1.8-1.2 4-1 4.6.4.5 1.2-.8 2.6-2.7 2.8-1.8.2-3.3-.6-3.4-1.8-.1-.5.3-1 1.5-1.4z" fill="var(--illust-blush)" strokeWidth="1.3" />
      <path d="M28.8 30.6c2-1.1 4.3-.7 4.8.8.4 1.2-1.1 2.5-3.1 2.6-1.9.1-3.5-.8-3.5-2 0-.5.4-1 1.8-1.4z" fill="var(--illust-leaf)" strokeWidth="1.3" />
      <path d="M37.1 32.4c1.6-1 3.5-.7 3.9.6.4 1.1-.8 2.2-2.5 2.4-1.6.2-3-.5-3.1-1.6 0-.5.3-.9 1.7-1.4z" fill="var(--illust-cream)" strokeWidth="1.1" />
      <path d="M16.6 34.3c1.3 7.1 5.8 12.5 13.8 13.3" strokeWidth="1.1" opacity=".45" />
    </g>
  ),
  veg: (
    <g fill="none" stroke="var(--illust-ink)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.6 30.4c3.1-8.9 11.6-14.8 20.3-14 8.1.7 13.4 7 12.1 15-7.9-3.6-16.3-4-24.3-2.1-2.9.7-5.8 1.9-8.1 1.1z" fill="var(--illust-leaf)" opacity=".9" strokeWidth="2" />
      <path d="M18.3 28.6c6.6-5.3 15-7.4 23-5.7" strokeWidth="1.3" opacity=".6" />
      <path d="M24.4 42.6c-2.1-9.2 2.6-18.4 10.8-21.3 7.7-2.7 14.6 1.6 15.8 9.7-8.3-1.1-16.6 1.2-23 6.6-1.9 1.6-3.1 3.6-3.6 5z" fill="var(--illust-leaf)" opacity=".75" strokeWidth="2" />
      <path d="M29.8 38.4c4-6.8 10.8-11.6 18.6-13.1" strokeWidth="1.3" opacity=".5" />
      <path d="M38.6 44.3c3-4.8 8.7-6.9 13.2-4.6 4 2 4.6 6.6 1.2 10.1-3.3 3.4-9 4-12.7 1.3-2.3-1.7-3-4.2-1.7-6.8z" fill="var(--illust-cream)" strokeWidth="1.7" />
      <path d="M43.6 42.6c.8-.5 1.7-.3 1.9.4" strokeWidth="1.1" opacity=".6" />
      <path d="M47.8 44.8c.8-.4 1.7-.1 1.8.6" strokeWidth="1.1" opacity=".6" />
    </g>
  ),
  misoSpoon: (
    <g fill="none" stroke="var(--illust-ink)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.6 26.3c0-5.3 5.7-9.3 12.7-9.3 7.1 0 12.9 4.1 12.8 9.4-.1 5.2-5.8 9-12.9 8.9-6.9-.1-12.6-3.9-12.6-9z" strokeWidth="2" />
      <path d="M30.2 34.1c2.6 7 4.8 14.6 6.1 22.4" strokeWidth="2" />
      <path d="M34.8 50.6c1-.9 2.3-.8 2.6.3.3 1-.6 2-1.8 2.1-1.1.1-2-.5-2-1.4 0-.4.3-.7 1.2-1z" strokeWidth="1.3" />
      <path d="M18.3 23.6c2.8-2.2 6.8-2.6 9.4-.8 2.4 1.7 2 4.5-1 5.9-2.9 1.4-6.8 1-9-1-1.8-1.6-1.6-2.9.6-4.1z" fill="var(--illust-warm)" strokeWidth="1.7" />
      <path d="M21.4 24.6c1.8-.6 3.9-.3 5 .8" strokeWidth="1.1" opacity=".5" />
      <path d="M31.6 37.8c.9 4.4 2 8.9 3.1 13.2" strokeWidth="1.1" opacity=".45" />
      <path d="M15.6 25.1c3.9-2.1 9.1-2.9 14.1-2.2" strokeWidth="1.1" opacity=".45" />
    </g>
  ),
};
