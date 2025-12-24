-- Create the history table
create table public.history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  tool_slug text not null,
  content jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.history enable row level security;

-- Policy to allow users to insert their own history
create policy "Users can insert their own history"
  on public.history for insert
  with check (auth.uid() = user_id);

-- Policy to allow users to view their own history
create policy "Users can view their own history"
  on public.history for select
  using (auth.uid() = user_id);

-- Policy to allow users to delete their own history (optional)
create policy "Users can delete their own history"
  on public.history for delete
  using (auth.uid() = user_id);
