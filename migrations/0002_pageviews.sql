-- Phase 2: 通常閲覧(QR経由に限らないページ単位)のアクセス計測
-- middleware.ts からのPostgREST書き込み用テーブル

create table if not exists pageviews (
  id bigserial primary key,
  ts timestamptz not null default now(),
  day date not null,
  month text not null,
  locale text not null,
  path text not null,
  section text not null, -- 'top' | 'products' | 'product_detail' | 'recipes' | 'recipe_detail' | 'producer' | 'other'
  visitor_hash text,
  ua_class text,
  country text
);
create index if not exists pageviews_day_idx on pageviews (day);
create index if not exists pageviews_section_idx on pageviews (section);
