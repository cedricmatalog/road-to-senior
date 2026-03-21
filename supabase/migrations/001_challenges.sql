create table challenges (
  slug        text primary key,
  title       text not null,
  description text not null,
  type        text not null check (type in ('code', 'scenario')),
  difficulty  text not null check (difficulty in ('junior', 'mid', 'senior')),
  skills      text[] not null,
  content     jsonb not null,
  created_at  timestamptz default now()
);

-- Allow anyone to read challenges (public content)
alter table challenges enable row level security;
create policy "challenges are public" on challenges for select using (true);
