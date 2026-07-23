-- The consultation_requests table (and the staff auth user) were found missing when this
-- migration was applied on 2026-07-22 — the Supabase project had been auto-paused and came
-- back empty. This recreates the table (now including the "interest" field the consult form
-- added) with the same RLS shape as before: anon can insert, authenticated staff can select.
-- The staff login account itself is NOT recreated here — set that up again via Supabase Auth.

create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  interest text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.consultation_requests enable row level security;

create policy "Anyone can submit a consultation request"
  on public.consultation_requests
  for insert
  to anon
  with check (true);

create policy "Authenticated staff can view consultation requests"
  on public.consultation_requests
  for select
  to authenticated
  using (true);
