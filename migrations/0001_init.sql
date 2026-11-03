-- Phase 1: QRトラッキング基盤
-- tenants / places / items / qr_codes / scans

create table if not exists tenants (
  id serial primary key,
  slug text not null unique,
  name text not null
);

create table if not exists places (
  id serial primary key,
  tenant_id integer not null references tenants(id) on delete cascade,
  name text not null,
  note text
);

create table if not exists items (
  id serial primary key,
  tenant_id integer not null references tenants(id) on delete cascade,
  slug text not null,
  name text not null,
  external_ref text,
  unique (tenant_id, slug)
);

create table if not exists qr_codes (
  code text primary key,
  tenant_id integer not null references tenants(id) on delete cascade,
  item_id integer references items(id) on delete set null,
  place_id integer references places(id) on delete set null,
  dest_path text not null,
  label text,
  created_at timestamptz not null default now(),
  archived boolean not null default false
);

create table if not exists scans (
  id bigserial primary key,
  code text not null references qr_codes(code) on delete cascade,
  ts timestamptz not null default now(),
  day date not null,
  month text not null,
  visitor_hash text,
  ua_class text,
  country text
);

create index if not exists scans_code_idx on scans (code);
create index if not exists scans_day_idx on scans (day);
create index if not exists qr_codes_item_idx on qr_codes (item_id);

-- 初期データ(tenant / items / qr_codes)
insert into tenants (slug, name)
values ('miso-koubou', 'みそ工房の郷')
on conflict (slug) do nothing;

insert into items (tenant_id, slug, name, external_ref)
select t.id, v.slug, v.name, v.slug
from tenants t
cross join (
  values
    ('koshu-miso', '甲州みそ'),
    ('rice-miso', '米みそ'),
    ('kinzanji-miso', '金山寺みそ')
) as v(slug, name)
where t.slug = 'miso-koubou'
on conflict (tenant_id, slug) do nothing;

insert into qr_codes (code, tenant_id, item_id, dest_path, label)
select v.code, t.id, i.id, v.dest_path, v.label
from tenants t
join items i on i.tenant_id = t.id
cross join (
  values
    ('QXaXC', 'koshu-miso', '/ja/products/koshu-miso', '甲州みそ'),
    ('T2qjP', 'rice-miso', '/ja/products/rice-miso', '米みそ'),
    ('7WZLZ', 'kinzanji-miso', '/ja/products/kinzanji-miso', '金山寺みそ')
) as v(code, item_slug, dest_path, label)
where t.slug = 'miso-koubou' and i.slug = v.item_slug
on conflict (code) do nothing;
