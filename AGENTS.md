# AGENTS.md

## Commands

- `pnpm dev` - Start dev server | `pnpm build` - Production build | `pnpm lint` - ESLint
- `pnpm db:push` - Push schema to DB | No test runner configured

## Code Style

- **Formatting:** Prettier with single quotes, trailing commas (es5), semicolons, 2-space indent
- **TypeScript:** Strict mode, use `@/*` path alias for src imports
- **Imports:** `'use client'` first, then React, third-party, `@/` aliases, relative imports last

## Naming Conventions

- **Files:** kebab-case (`app-sidebar.tsx`), private folders with `_` prefix (`_components/`)
- **Components:** PascalCase functions, named exports (`export function NavUser`)
- **Variables/functions:** camelCase | **Services/Repos:** PascalCase singletons (`UserService`)
- **Types:** Use `type` with descriptive names or `Props` suffix; infer from Zod schemas

## Error Handling

- Forms: Zod + react-hook-form with `zodResolver`, mode: `onChange`
- API errors: Check `error.code`, use `form.setError()` and `toast.error()`
- Auth guards: Use `requireAuth()` from `@/utils/auth.ts`, redirects to `/auth/register`

## Architecture

- Next.js 15 App Router | Drizzle ORM + PostgreSQL | better-auth | Tailwind CSS 4
- UI components: shadcn pattern with `cva`, `cn()`, `data-slot` attributes
- Server: `repositories/` (data) -> `services/` (logic) | Client: `'use client'` directive
