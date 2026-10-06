# grokinstall-website

<p align="center">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="assets/hero/hero-reduced.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/hero/hero-light.svg">
    <img src="assets/hero/hero-motion.svg" alt="grokinstall-website — animated project plate showing job &rarr; scan &rarr; isolate &rarr; terminate. Motion depicts this project's real state transition." width="100%">
  </picture>
</p>

<p align="center">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="assets/hero/computational-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/hero/computational-light.svg">
    <img src="assets/hero/computational-motion.svg" alt="State machine: job &rarr; scan &rarr; isolate &rarr; terminate." width="100%">
  </picture>
</p>

The public site for [GrokInstall](https://github.com/M4G3LL4N0/grokinstall).

A static Vite + TypeScript site. No runtime framework, no analytics, no
tracking, no cookies.

## Commands

```bash
pnpm install
pnpm dev        # local development
pnpm lint       # eslint, zero warnings tolerated
pnpm typecheck  # tsc --noEmit
pnpm build      # typecheck, then production build to dist/
pnpm preview    # serve the production build
```

## Principles this site follows

- **No invented claims.** Every figure on the page was measured by running the
  published binary. Where a number is an observation rather than a promise, the
  page says so.
- **Supported and planned are never blurred.** The page describes what runs
  today and marks anything else as not-yet.
- **No `curl | sh`.** The install section leads with a download and a checksum
  verification step, because asking people to pipe a script into a shell is
  asking them to trust an unverified string.
- **Bounded dependencies.** Vite and TypeScript. Nothing ships that is not used.

## Verified content

The contract shown on the page is byte-for-byte the output of
`grokinstall grokbot bat.review` from the published v0.1.1 darwin/arm64
binary. The refusal shown is the real output of an attempted `click` install.
Regenerate both with `pnpm dev` after changing the binary version.

## Deploying

Vercel detects Vite automatically. No configuration is required.
