# ShopSight — Project Rules for Claude

## Stack

- Next.js 16 App Router
- TypeScript (strict mode)
- Tailwind CSS (use inline styles)

## File & Folder Conventions

- Components: PascalCase, e.g. `ProductCard.tsx`
- Files: kebab-case, e.g. `product-utils.ts`
- All types go in `/lib/types.ts`
- All API helpers go in `/lib/api.ts`
- No default exports — always named exports

## Component Rules

- Every component must have a typed Props interface
- Use Tailwind only — no CSS modules, no styled-components
- All interactive elements must have accessible labels
- Use `cn()` utility from `/lib/utils.ts` for conditional classes
- Always use Next.js `<Image>` from `next/image` — never use `<img>`
- Always use Next.js `<Link>` from `next/link` — never use `<a>`

## Git

- Commit messages: conventional commits (feat:, fix:, chore:)
- Never commit directly to main
- Always create a branch before making changes

## Mock Data

- All mock data lives in `/data/*.json`
- Never hardcode data inside components
