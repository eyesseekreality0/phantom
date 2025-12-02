# Phantom

A Vite + React front-end for player authentication, UltraPanda account linking, and point transfers.

## Prerequisites
- Node.js 20+
- A Supabase project (for auth, profiles, and game account storage)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure Supabase by creating a `.env.local` file (or reuse `.env`) based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Supabase configuration
This app needs Supabase credentials to let players sign up, log in, and sync UltraPanda game accounts.

1. In your Supabase project settings, copy the **Project URL** and **anon public key**.
2. Paste them into `.env.local`:
   ```bash
   VITE_SUPABASE_URL="https://<your-project-id>.supabase.co"
   VITE_SUPABASE_ANON_KEY="<anon-public-key>"
   ```
3. (Optional) If you only have the service role key in your deployment environment, set `VITE_SUPABASE_SERVICE_ROLE_KEY` instead of the anon key. The client prefers the anon key and will fall back to the service role key only when the anon key is missing.
4. For Netlify or other hosts, add the same variables to the site environment so production builds stay connected to Supabase. Netlify deployments can use either the `VITE_`-prefixed names above or plain `SUPABASE_URL` / `SUPABASE_ANON_KEY` variables, which are now exposed to the client build automatically.

## Scripts
- `npm run dev` – start the Vite dev server
- `npm run build` – build the production bundle
- `npm run lint` – lint the codebase

## Database
Supabase table definitions and migrations live in `supabase/migrations/`. Apply them to your project with the Supabase CLI to align the database schema used by the app.
