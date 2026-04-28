# OpenCut — Agent Instructions

## Project

Open-source video production engine built on Remotion. Define a timeline in TypeScript, point it at footage and transcripts, render a polished video.

## Tech Stack

- **Runtime**: Node 20
- **Language**: TypeScript 5.8.3 (strict mode, noUnusedLocals, noUnusedParameters)
- **Framework**: Remotion 4.0.446
- **Testing**: Node built-in test runner + ts-node/register
- **Coverage**: c8
- **Docs**: TypeDoc

## Key Commands

```bash
npm test                 # Run all 110 tests
npm run typecheck        # tsc --noEmit
npm run test:coverage    # c8 npm test
npm run docs:generate    # typedoc
```

## Directory Structure

```
src/engine/         # Core components, types, animation utilities, plugin system
src/engine/animation/  # Domain-specific animation helpers (particles, easing, motion, etc.)
src/cli/            # CLI tools: init.ts, validate.ts, render.ts, transcribe.ts
src/workflow/       # Project loader, validator, generator (JSON/YAML → TypeScript)
src/examples/       # Example video projects
src/api/            # Optional Express API for remote rendering
```

## Code Style & Conventions

- **Strict TypeScript**: `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`
- **No `any` in production code**: Use `unknown` + type guards if needed
- **No shell string concatenation**: Always use `execFileSync` or `execFile` with arg arrays
- **Error handling**: Empty `catch {}` blocks must log the error via `console.debug`/`console.warn`
- **Env vars**: Read via `src/env.ts` (`requireEnv()` for required, `env.*` for optional)

## Testing Conventions

- Use Node's built-in `node:test` runner
- Place tests next to source: `src/engine/__tests__/Thing.test.ts`
- Integration tests that render frames must auto-detect Chrome and skip gracefully in CI
- Run `npm test` before every commit

## Plugin System

Plugins can register custom segment renderers, background effects, and timeline transforms.
See `src/engine/plugin.ts` for the API. Keep `src/engine/index.ts` exports up to date.

## Adding a New Example

1. Create `src/examples/<name>/` with `config.ts`, `timeline.ts`, `subtitles.ts`, `Root.tsx`, `index.ts`
2. Add npm scripts in `package.json`: `<name>:preview`, `<name>:render`, `<name>:test`
3. Update README.md examples list
4. Ensure `npx tsc --noEmit` passes

## Security Rules

- **NEVER** use `execSync(cmd)` with string interpolation from user input
- **NEVER** commit API keys or secrets
- **ALWAYS** validate file paths before reading/writing
- **ALWAYS** sanitize user input before using in file operations
