# tedx-tapmi

## Registration database

Registrations are stored in PostgreSQL through the Vercel function at `/api/registrations`.

1. Create a PostgreSQL database with Neon, Supabase, or another hosted provider.
2. Set `DATABASE_URL` in Vercel project settings and in a local `.env` file when testing locally.
3. Run `db/001_create_registrations.sql` against the database.
4. Install dependencies with `npm install` and run `npm run dev`.

The database migration enforces a 250-seat capacity workflow, unique email addresses, and unique TAPMI roll numbers. Never expose `DATABASE_URL` through a `VITE_*` variable or client-side code.

