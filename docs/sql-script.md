# Supabase Database Setup Script

In your Supabase project, navigate to the **SQL Editor**, create a new query, and run the entire script below. This will create the necessary tables, set up row-level security, and configure a trigger for new user profiles.

---

```sql
-- Create a table for public user profiles
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  name varchar(255),
  avatar_url text,
  streak int default 0,
  points int default 0,
  learning_goal text
);
-- Set up Row Level Security
alter table profiles enable row level security;
create policy "Users can view their own profile." on profiles for select using (auth.uid() = id);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Create a table to track lesson progress
create table user_lesson_progress (
    user_id uuid references auth.users not null,
    lesson_id text not null,
    created_at timestamp with time zone default now(),
    primary key (user_id, lesson_id)
);
-- Set up Row Level Security
alter table user_lesson_progress enable row level security;
create policy "Users can view their own progress." on user_lesson_progress for select using (auth.uid() = user_id);
create policy "Users can insert their own progress." on user_lesson_progress for insert with check (auth.uid() = user_id);

-- (Optional but Recommended) Create a trigger to automatically create a profile on new user sign-up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```
