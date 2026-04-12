# Supabase Setup (Free Tier)

This setup enables owner-only editing in /admin with no paid plan required.

## 1) Create Supabase project
- Go to Supabase and create a free project.
- Copy Project URL and anon key.

## 2) Configure environment
Create a `.env` in the `portifolio` folder based on `.env.example`.

Minimum required for admin:
- `VITE_CONTENT_SOURCE=supabase`
- `VITE_SUPABASE_URL=...`
- `VITE_SUPABASE_ANON_KEY=...`
- `VITE_ADMIN_EMAILS=your-email@example.com`

## 3) Create content table
Run this SQL in Supabase SQL editor:

```sql
create table if not exists public.portfolio_content (
  id bigint primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

alter table public.portfolio_content enable row level security;

create policy "read content" on public.portfolio_content
for select
using (true);

create policy "owner can write content" on public.portfolio_content
for all
using (auth.jwt() ->> 'email' in ('your-email@example.com'))
with check (auth.jwt() ->> 'email' in ('your-email@example.com'));
```

Replace email in policy with your owner email.

## 4) Create storage bucket for resume
- Bucket name: `resume-files` (or set `VITE_SUPABASE_RESUME_BUCKET`)
- Make bucket public.
- Add storage policy so only your owner account can upload.

## 5) Auth settings
- Enable Email auth in Supabase.
- In URL settings, add your local URL and production URL as redirect:
  - `http://localhost:5173/admin`

## 6) Run app
- `npm run dev`
- Open `/admin`
- Login via magic link.
- Edit projects and resume.
