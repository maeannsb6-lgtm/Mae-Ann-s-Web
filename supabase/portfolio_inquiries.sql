-- Run once in the Supabase SQL Editor for the project used by this portfolio.
-- The browser never accesses this table directly. Only the Vercel serverless
-- endpoint uses the service role key, which must remain server-side.

create table if not exists public.portfolio_inquiries (
  id uuid primary key default gen_random_uuid(),
  client_submission_id text not null unique
    check (char_length(client_submission_id) between 16 and 80),
  name text not null check (char_length(name) between 2 and 150),
  email text not null check (char_length(email) <= 254),
  company text check (company is null or char_length(company) <= 200),
  inquiry_type text not null check (inquiry_type in (
    'Process Improvement', 'Automation', 'Client Workflow',
    'AI Integration', 'Website/System', 'Other'
  )),
  message text not null check (char_length(message) between 10 and 5000),
  source text not null default 'Mae Ann Portfolio Website',
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'proposal', 'closed')),
  notes text,
  follow_up_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.portfolio_inquiries enable row level security;

revoke all on table public.portfolio_inquiries from anon, authenticated;
grant select, insert, update, delete on table public.portfolio_inquiries to service_role;

create index if not exists portfolio_inquiries_status_created_idx
  on public.portfolio_inquiries (status, created_at desc);

comment on table public.portfolio_inquiries is
  'Private portfolio inquiry pipeline. Server-side access only.';
