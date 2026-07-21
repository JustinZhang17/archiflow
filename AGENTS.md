# Archiflow — Agent Notes

Open-source isometric architectural diagramming tool. Next.js 15 (Pages Router), React 19, Three.js via @react-three/fiber, Tailwind v4 + DaisyUI.

## Quick Commands

```bash
pnpm install   # package manager is pnpm
pnpm dev       # Next.js dev server
pnpm build     # production build
pnpm lint      # ESLint 9 flat config (eslint.config.mjs)
pnpm storybook            # Storybook dev on :6006
pnpm build-storybook      # Storybook static build
```

**No test runner is configured.** There are 11 empty `*.test.tsx` placeholder files but zero test infrastructure (no Jest, Vitest, Playwright, etc.).

## Architecture & Entrypoints

| File | Role |
|------|------|
| `pages/_app.tsx` | App root. Loads local fonts (Satoshi, Erode) via `next/font/local`, wraps in `NextIntlClientProvider`, `PageHead`, and a `Loading` hydration gate. |
| `pages/index.tsx` | Main page. Renders the R3F `<Canvas>`, all UI overlays (Sidebar, TopBar, BottomBar, modals), and 3D objects mapped from the store. Uses `getStaticProps` to load i18n JSON. |
| `helpers/modelRegistry.tsx` | **Dynamic model discovery.** Uses webpack `require.context('/public/models', true, /\.jsx$/)` to auto-register every `.jsx` model component at build time. Will not work outside Next.js webpack/Turbopack. |
| `components/organisms/LoadingScreen.tsx` | Blocks rendering until Zustand rehydration completes and a valid profile is present. |

## State Management

- Two Zustand stores with `persist` middleware (localStorage):
  - `stores/canvas/canvasStore.ts` — key `canvas-storage`
  - `stores/profileStore.ts` — key `profile-storage`
- `hooks/useProfile.ts` auto-creates a default profile if none exists.
- `hooks/useYjsSync.ts` is an empty placeholder for future real-time collaboration.

## 3D Model Pipeline

- Models are generated with [`gltfjsx`](https://github.com/pmndrs/gltfjsx).
- Each model lives in `public/models/<Name>/` containing:
  - `<Name>.jsx` — React component using `useGLTF`
  - `<name>-transformed.glb` — optimized GLB
  - original `.glb`
- `modelRegistry.tsx` discovers `.jsx` files automatically at build time.

## Build & Config Gotchas

- `next.config.ts` sets `transpilePackages: ["three"]` — required because Three.js is not fully ESM-compatible with Next.js out of the box.
- `pnpm-workspace.yaml` is **required** pnpm v11 configuration. It contains the `allowBuilds` setting (replaced `onlyBuiltDependencies` in v11). Single-package workspaces without a `packages:` key are officially valid — the root package is included by default.
- Path alias `@/*` maps to `./*` in both `tsconfig.json` and Next.js.
- No `tailwind.config.js` — Tailwind v4 themes are defined directly in `styles/globals.css` via `@plugin "daisyui/theme"`.
- DaisyUI themes are named `sun` (light) and `moon` (dark), **not** `light`/`dark`, to avoid collisions with DaisyUI defaults.
- Local fonts are loaded via `next/font/local` and exposed as CSS variables `--font-satoshi` and `--font-erode`.

## i18n

- `next-intl` 4.7.0; locales `en` and `fr`.
- Translation JSON lives in `messages/`.
- `pages/index.tsx` loads messages at build time via `getStaticProps` with fallback to `en`.

## CI / Pre-commit

- No GitHub Actions workflows.
- No pre-commit hooks (no `.husky/`, no `lint-staged`).

## Storybook

- Framework: `@storybook/nextjs-vite`.
- `preview.tsx` wraps every story in `NextIntlClientProvider` (locale `en`) and the `Loading` component.
- Stories glob: `components/**/*.stories.@(js|jsx|mjs|ts|tsx)`.
