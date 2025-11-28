# Phantom

This project is wired to the Supabase project **phantom**. Use the steps below to make sure your local environment and database match what the app expects.

## Environment setup
1. Copy `.env.example` to `.env.local` (Vite picks up any `.env.*` file) and fill in the real Supabase credentials from the `phantom` project:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. Add any Netlify-only environment values (Ultrapanda automation and `PUBLIC_SITE_ORIGIN`) through Netlify’s UI rather than committing secrets.

## Connecting Supabase CLI to the phantom project
1. Install the Supabase CLI if you haven’t already: `npm install -g supabase`.
2. Authenticate: `supabase login` (uses your browser or a pasted access token).
3. Link the repository to the hosted project ref:
   ```bash
   supabase link --project-ref phantom
   ```
   The `supabase/config.toml` already sets `project_id = "phantom"` so subsequent CLI commands target the correct project.

## Applying database migrations
Run the migrations to create/verify all required tables (profiles, chat, game accounts, and transactions):
```bash
supabase db push
```
This applies all SQL files in `supabase/migrations/`, including the base schema and row-level security policies the UI depends on.

## Development
- Install dependencies: `npm install`
- Start the dev server: `npm run dev`
- Build for production: `npm run build`

## Deployment notes
- Netlify functions use `PUBLIC_SITE_ORIGIN` for CORS and the ULTRAPANDA_* secrets for player automation. Configure these in Netlify before deploying.
- Ensure the Supabase environment variables are set in your Netlify site so the frontend can reach the `phantom` project.
