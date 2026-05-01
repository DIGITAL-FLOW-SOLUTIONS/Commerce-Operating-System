# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: **Supabase Postgres** (managed) + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Database — Supabase

This project uses Supabase as the primary Postgres database. The previous
Replit-managed Postgres (`DATABASE_URL`) is no longer the source of truth and
should be considered legacy.

### Connection strings

The db layer (`lib/db/src/index.ts`) reads connection strings in this order:

1. `SUPABASE_POOLER_CONNECTION_STRING` *(preferred for runtime)* — Supavisor
   pooler URL from **Supabase Dashboard → Project Settings → Database →
   Connection pooling**. Use the **Session pooler (port 5432)** URL. This is
   IPv4-reachable, which is required because the Replit container does not
   have IPv6.
2. `SUPABASE_DIRECT_CONNECTION_STRING` *(used by `drizzle-kit push` and
   migrations)* — direct `db.<ref>.supabase.co:5432` host. IPv6-only unless
   the IPv4 add-on is enabled on the Supabase project.
3. `DATABASE_URL` — legacy fallback only.

### Required Supabase env secrets

- `SUPABASE_URL` — REST endpoint, e.g. `https://<ref>.supabase.co`
- `SUPABASE_ANON_PUBLIC_KEY` — public anon key
- `SUPABASE_PUBLISHABLE_KEY` — alias of the publishable client key
- `SUPABASE_SERVICE_ROLE_SECRET` — server-only privileged key (never ship to
  the browser)
- `SUPABASE_DIRECT_CONNECTION_STRING` — direct Postgres URL (migrations)
- `SUPABASE_POOLER_CONNECTION_STRING` — Supavisor session-pooler URL (runtime)

### Initial migration

`.local/migrations/supabase_setup.sql` contains the idempotent schema + the 8
existing leads ported from the prior Replit Postgres. Run it once in the
Supabase SQL Editor (Dashboard → SQL Editor → New query) on a fresh project.

### Row Level Security

`leads` has RLS enabled with a single `service_role` policy. The Express API
connects with the privileged Postgres role (via the pooler URL), so it bypasses
RLS for all backend traffic. The anon key cannot read leads through PostgREST
because no anon policy exists.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes to Supabase
  (uses `SUPABASE_DIRECT_CONNECTION_STRING`)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

- `artifacts/marketing` (`/`) — Sokoa marketing site (login, signup, build flow). Authenticated merchants are redirected to `/~/` via `window.location.assign` (cross-artifact base paths).
- `artifacts/merchant-dashboard` (`/~/`) — Sokoa Merchant Dashboard (Multi-Surface Commerce OS). React + Vite + wouter + framer-motion + next-themes. Mock data lives in `src/lib/mock-data.tsx` (`DataProvider` + `useData` hook) with a four-state demo toggle (`both` / `tiktok_only` / `boutique_only` / `none`). Sidebar nav: Dashboard, My Stores, Published Stores, Payouts, Subscriptions, Analytics, Notifications, Settings. Built pages: `/`, `/payouts`, `/stores`, `/stores/:id` (6-tab detail), `/published`, `/notifications`. Other routes render an under-construction `Placeholder` for expandability. `DataProvider` exposes `markAsRead(id)` and `markAllAsRead()` for live notification state. Brand tokens live in `src/index.css` mirroring marketing. Sokoa logo + favicon are mirrored from marketing (`SokoaLogo` component, `public/logos/`, `public/favicon.svg`). Public asset URLs must be prefixed with `import.meta.env.BASE_URL` (helper `ASSET()` in mock-data).
- `artifacts/api-server` (`/api`) — shared Express API + Supabase.
- `artifacts/mockup-sandbox` (`/__mockup`) — design canvas preview server.
