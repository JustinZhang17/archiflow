# Archiflow Cleanup Checklist

Numbered items you can tackle one by one. Check them off as you go.

---

## ✅ Already Completed

| Item | Description |
|------|-------------|
| C1 | Removed synchronous `while (!checkHydration())` spin loop from `LoadingScreen.tsx` |
| C2 | Centralized profile creation into `LoadingScreen.tsx` only; `useProfile.ts` no longer mutates stores |
| C3 | Deleted dead `LoadingContext`, `createContext` import, and provider wrapper from `LoadingScreen.tsx` |
| C4 | Removed dangling `/// <reference path="./.next/types/routes.d.ts" />` from `next-env.d.ts` |
| M9 | Removed useless `useMemo(() => profileId, [profileId])` from `Sidebar.tsx` |
| M18 | Deleted debug `console.log` block from `pages/index.tsx` |
| M24 | Removed redundant `setProfileId` no-op branch from `useProfile.ts` |
| — | Refactored `useProfile` to React Context (Option C); all 8 `useProfile()!` assertions removed |

---

## 🟡 Moderate (21 items)

These are cleanup, dead code, type issues, and inefficiencies.

### M1. Delete 11 empty test placeholder files
- **Files:**
  - `components/atoms/Button/Button.test.tsx`
  - `components/atoms/LanguagePicker/LanguagePicker.test.tsx`
  - `components/atoms/SettingEntry/SettingEntry.test.tsx`
  - `components/atoms/SettingTitle/SettingTitle.test.tsx`
  - `components/atoms/ThemePicker/ThemePicker.test.tsx`
  - `components/atoms/Thumbnail/Thumbnail.test.tsx`
  - `components/molecules/Draggable/Draggable.test.tsx`
  - `components/molecules/IconCard/IconCard.test.tsx`
  - `components/global/Cursor/Cursor.test.tsx`
  - `components/global/Ghost/Ghost.test.tsx`
  - `components/global/PageHead/PageHead.test.tsx`
- **Fix:** Delete all 11 files. Re-add when you configure an actual test runner.

### M2. Delete 8 empty/minimal Storybook stories
- **Files:**
  - `components/atoms/Button/Button.stories.tsx`
  - `components/atoms/LanguagePicker/LanguagePicker.stories.tsx`
  - `components/atoms/SettingTitle/SettingTitle.stories.tsx`
  - `components/atoms/ThemePicker/ThemePicker.stories.tsx`
  - `components/atoms/Thumbnail/Thumbnail.stories.tsx`
  - `components/atoms/SettingEntry/SettingEntry.stories.tsx`
  - `components/molecules/Draggable/Draggable.stories.tsx`
  - `components/molecules/IconCard/IconCard.stories.tsx`
- **Issue:** All export only a `title` with no actual stories.
- **Fix:** Delete or write proper stories with args.

### M3. Remove unused original GLB from `public/`
- **File:** `public/models/Bowl/bowl.glb` (~1.59 MB)
- **Issue:** `Bowl.jsx` loads `bowl-transformed.glb` (63 KB). The original is never referenced but gets served as a static file because it lives in `public/`.
- **Fix:** Move it out of `public/` (e.g., `raw-models/` at repo root) or delete it if source control is sufficient.

### M4. Remove ~24 unused font files
- **Files:** All `Erode-*.woff2` except `Erode-Regular.woff2`; all `Satoshi-*.woff2` except `Satoshi-Medium.woff2`.
- **Issue:** `pages/_app.tsx` only registers two weights. The rest are dead weight in the repo and any static export.
- **Fix:** Remove unregistered files, or register all intended weights in `next/font/local`.

### M5. Delete empty `public/icons/` directory
- **File:** `public/icons/.DS_Store`
- **Issue:** Directory is empty except for a macOS metadata file. Path is referenced nowhere in code.
- **Fix:** Delete the entire `public/icons/` directory.

### M7. Delete unused boilerplate API route
- **File:** `pages/api/hello.ts`
- **Issue:** Returns `{ name: "John Doe" }`. Never called by the frontend.
- **Fix:** Delete the file. If `pages/api/` becomes empty, delete the directory too.

### M8. Delete empty shell components
- **Files:** `components/organisms/Topbar.tsx`, `components/organisms/Bottombar.tsx`
- **Issue:** Both render empty absolutely-positioned divs with no children, styling, or logic.
- **Fix:** Delete them or implement their intended UI.

### M10. Fix implicit `any` on spread props — LanguagePicker
- **File:** `components/atoms/LanguagePicker/LanguagePicker.tsx:6`
- **Issue:** `const LanguagePicker = ({ ...props }) => {` has no type annotation.
- **Fix:** Add explicit type, e.g., `React.ComponentProps<'select'>`.

### M11. Fix implicit `any` on spread props — ThemePicker
- **File:** `components/atoms/ThemePicker/ThemePicker.tsx:10`
- **Issue:** Same as M10.
- **Fix:** Add explicit type, e.g., `React.ComponentProps<'fieldset'>`.

### M12. Fix explicit `any` in model registry
- **File:** `helpers/modelRegistry.tsx:6`
- **Issue:** `Record<string, ComponentType<any>>` loses all type safety for dynamically loaded 3D components.
- **Fix:** Define a `ModelComponentProps` interface (position, rotation, scale, ref, onPointerMove, etc.) and type as `ComponentType<ModelComponentProps>`.

### M13. Add types to generated model component
- **File:** `public/models/Bowl/Bowl.jsx:9`
- **Issue:** `export default function Model(props)` has no type annotation.
- **Fix:** Convert to `.tsx` and type `props`, or add a JSDoc `@param` block.

### M14. Remove or render unused `tags` prop
- **File:** `components/molecules/IconCard/IconCard.tsx:9, 13`
- **Issue:** `IconCardProps` declares `tags: string[]`, destructures it, but never renders it. `Sidebar.tsx` passes `tags={[]}` anyway.
- **Fix:** Either render the tags in JSX or remove the prop from the type and destructuring.

### M15. Extract hardcoded model data from Sidebar
- **File:** `components/organisms/Sidebar.tsx:17–27`
- **Issue:** `MODELS` array is redeclared on every render and mixes data with UI.
- **Fix:** Extract `MODELS` to a constants/data file (e.g., `constants/models.ts`).

### M16. Remove unused `React` namespace import
- **File:** `components/atoms/Button/Button.tsx:1`
- **Issue:** `import React, { ... } from 'react'` — Next.js 15 / React 19 JSX transform does not need the namespace.
- **Fix:** Change to `import { ButtonHTMLAttributes, ReactNode } from 'react'`.

### M17. Extract duplicate snapping/lerp logic
- **Files:** `components/global/Ghost/Ghost.tsx:35–46` and `components/molecules/Draggable/Draggable.tsx:61–80`
- **Issue:** Both independently implement grid-snapping (`Math.round(... / SNAP_INTERVAL) * SNAP_INTERVAL`) and lerp smoothing (`obj.position.lerp(..., ANIMATION_SPEED)`).
- **Fix:** Extract a shared utility (e.g., `helpers/three.ts` with `snapToGrid` and `lerpToTarget`) or a custom hook.

### M19. Populate empty `site.webmanifest` fields
- **File:** `public/site.webmanifest:2–3`
- **Issue:** `"name": ""` and `"short_name": ""` break PWA install prompts.
- **Fix:** Set both to `"Archiflow"`.

### M20. Reduce redundant `getState()` calls
- **File:** `pages/index.tsx:40, 41, 44, 55`
- **Issue:** Four separate `useCanvasStore.getState()` calls instead of destructuring once.
- **Fix:** Destructure needed actions at the top of the component into local constants.

### M21. Fix wrong key type in `CanvasState`
- **File:** `types/canvas.ts:11`
- **Issue:** `profiles: Record<ObjectProps['id'], ProfileProps>` — semantically misleading.
- **Fix:** Change to `Record<ProfileProps['id'], ProfileProps>`.

### M22. Combine duplicate imports
- **File:** `types/profile.ts:3–4`
- **Issue:** Two separate `import { ... } from "@/types/enums"` lines.
- **Fix:** Combine into one import statement.

### M23. Fix React `key` anti-pattern
- **File:** `pages/index.tsx:116`
- **Issue:** `<Draggable key={index}>` uses array index as key. Objects can be deleted/added, causing unnecessary re-renders and state loss.
- **Fix:** Use `key={obj.instanceId}`.

### M25. Delete empty placeholder hook
- **File:** `hooks/useYjsSync.ts`
- **Issue:** Only contains a comment. No logic, no exports.
- **Fix:** Delete the file. Re-add when Yjs integration actually happens.

### M26. Delete `debug-storybook.log`
- **File:** `debug-storybook.log` (root)
- **Issue:** Not matched by `*storybook.log` in `.gitignore` because of the `debug-` prefix.
- **Fix:** Delete the file, or broaden `.gitignore` to `*storybook*.log`.

---

## 🟢 Minor / Nits (13 items)

Small polish items. Low priority.

### N1. Remove dead CSS comment
- **File:** `styles/globals.css:68–72`
- **Issue:** Block-commented `html { cursor: none !important; }` with a `HACK` label.
- **Fix:** Delete the commented block.

### N2. Remove dead Storybook theme comments
- **File:** `.storybook/theme.ts:15–39`
- **Issue:** 25 lines of commented-out color configuration.
- **Fix:** Delete the commented block.

### N3. Remove stray incomplete comment
- **File:** `components/global/Ghost/Ghost.tsx:25`
- **Issue:** `// const` is meaningless.
- **Fix:** Delete the line.

### N4. Clean up scattered TODO/FIXME/HACK comments
- **Files:** `helpers/generators.ts:20, 31`; `pages/index.tsx:103`; `components/molecules/Draggable/Draggable.tsx:28, 44`; `components/atoms/Thumbnail/Thumbnail.tsx:8`; `components/organisms/SettingsModal.tsx:13`; `components/organisms/LoadingScreen.tsx:55`; `types/profile.ts:17`; `styles/globals.css:4, 61`; `.storybook/theme.ts:11`
- **Fix:** Create tickets for actionable items; remove noise comments for stale/completed thoughts.

### N5. Sync `eslint-config-next` version
- **File:** `package.json`
- **Issue:** `eslint-config-next` pinned to `15.3.4` while `next` is `^15.5.9`.
- **Fix:** Bump `eslint-config-next` to match the Next.js version.

### N6. Consider bumping `tsconfig.json` target
- **File:** `tsconfig.json:3`
- **Issue:** `"target": "ES2017"` is conservative for Next.js 15.
- **Fix:** Change to `"ES2022"` or `"ESNext"` if all target browsers support it.

### N7. Migrate ESLint flat config away from `FlatCompat`
- **File:** `eslint.config.mjs`
- **Issue:** `eslint-config-next` 15+ supports flat config natively. The wrapper adds unnecessary complexity.
- **Fix:** Replace with direct flat-config imports if supported by the installed version.

### N8. Verify whether `vite` devDependency is needed
- **File:** `package.json:40`
- **Issue:** `vite` is a peer dependency of `@storybook/nextjs-vite`. May or may not need to be explicit.
- **Fix:** Try removing it; re-add only if `pnpm install` or Storybook complains.

### N9. Remove `.DS_Store` files
- **Files:** `styles/fonts/.DS_Store`, `public/icons/.DS_Store`
- **Issue:** macOS metadata. Already gitignored but still on disk.
- **Fix:** Delete them.

### N10. Standardize export style across components
- **Issue:** Atoms/molecules use named exports (`export { Button }`), while organisms/global use default exports. Forces consumers to remember which pattern each file uses.
- **Fix:** Pick one style and apply it consistently. Default exports are conventional for page-level components; named exports are common for shared UI libraries.

### N11. `Lighting.tsx` is just a passthrough wrapper
- **File:** `components/organisms/three/Lighting.tsx`
- **Issue:** Only renders `<Environment preset="city" />` with no additional logic.
- **Fix:** Inline it into `pages/index.tsx` or keep it if you plan to add lights later.

### N12. `Ground.tsx` grid config is hardcoded inline
- **File:** `components/organisms/three/Ground.tsx:8–18`
- **Issue:** `gridConfig` object is recreated every render.
- **Fix:** Move `gridConfig` outside the component, or memoize it.

### N13. `Camera.tsx` creates new refs on every render
- **File:** `components/organisms/three/Camera.tsx:20–24`
- **Issue:** `raycaster`, `intersectionPoint`, and `groundPlane` refs are initialized with `new` inside the component body on every render (though ref semantics mean the first value wins, it's misleading).
- **Fix:** Use `useRef` with a lazy initializer: `useRef(() => new THREE.Raycaster())` or move initialization into `useEffect`.

---

## Suggested Batching Order

| Session | Items | Theme | Est. Time |
|---------|-------|-------|-----------|
| 2 | M1–M7 | Deletion pass (dead weight) | 10 min |
| 3 | M10–M14, M21–M23 | Type safety & small refactors | 25 min |
| 4 | M15–M20, M25–M26 | Logic cleanup & extraction | 25 min |
| 5 | N1–N13 | Polish & nits | 15 min |

---

*Last updated: 2026-07-21*
