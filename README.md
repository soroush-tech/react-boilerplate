# React Boilerplate

[![CI](https://github.com/soroush-tech/react-boilerplate/actions/workflows/ci.yml/badge.svg)](https://github.com/soroush-tech/react-boilerplate/actions/workflows/ci.yml)

A minimal, modern React starter built on Vite — with data fetching, API mocking, and testing already wired up.

## Stack

- ⚛️ [React 19](https://react.dev/) + TypeScript
- ⚡ [Vite 8](https://vitejs.dev/) with [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)
- 🔄 [TanStack Query 5](https://tanstack.com/query) with a `useCustomQuery` wrapper hook
- 🌐 [Axios](https://axios-http.com/) API client with interceptors and error mapping
- 🎭 [MSW 2](https://mswjs.io/) API mocking — browser worker in dev, Node server in tests
- 🧪 [Vitest 4](https://vitest.dev/) + [Testing Library](https://testing-library.com/) (jsdom, coverage via v8)
- 🧹 [ESLint 10](https://eslint.org/) flat config + [Prettier](https://prettier.io/)
- 🪝 [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) pre-commit hook
- 🤖 GitHub Actions CI (lint, typecheck, test, build)

## Requirements

- Node.js ≥ 22.12 (see `.nvmrc`)
- npm

## Getting Started

```bash
npm install
npm run dev
```

`npm install` also sets up the Husky git hooks via the `prepare` script.

## Available Scripts

| Script                  | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `npm run dev`           | Start the dev server with HMR (MSW mocks enabled) |
| `npm run build`         | Typecheck and build for production into `build/`  |
| `npm run preview`       | Preview the production build locally              |
| `npm test`              | Run tests in watch mode                           |
| `npm run test:ui`       | Run tests with the Vitest UI                      |
| `npm run test:coverage` | Run tests once with a coverage report             |
| `npm run lint`          | Lint with ESLint (zero warnings allowed)          |
| `npm run tsc`           | Typecheck without emitting                        |
| `npm run prettier`      | Format the whole project with Prettier            |

## Project Structure

```
src/
├── main.tsx                 # Entry point — mounts App, starts the MSW worker in dev
├── App.tsx                  # Demo component fetching a user via useCustomQuery
├── renderWithProvider.tsx   # StrictMode + QueryClientProvider wrapper
├── config.ts                # BASE_URL, REQUEST_TIMEOUT
├── common/hooks/            # useCustomQuery — TanStack Query wrapper around the API client
├── service/mocks/           # MSW handlers, browser worker (dev), Node server (tests)
└── utils/api/               # Axios client: instance factory, interceptors, error mapping
setup/tests/                 # vitest-setup.ts — jest-dom matchers + MSW server lifecycle
.github/workflows/           # CI pipeline
```

## Data Fetching

Requests go through the axios client singleton (`src/utils/api/client.ts`) via the `useCustomQuery` hook:

```tsx
const query = useCustomQuery<User>({
  queryKey: ['user'],
  config: { url: '/user', method: 'get' },
})
```

Set `BASE_URL` and `REQUEST_TIMEOUT` in `src/config.ts`.

## API Mocking (MSW)

Handlers live in `src/service/mocks/handlers.ts`.

- **Dev**: the browser worker starts automatically in `npm run dev` (see `src/main.tsx`). Set `VITE_MSW=1` to enable it in other modes.
- **Tests**: the Node server is wired up globally in `setup/tests/vitest-setup.ts`.

After upgrading the `msw` package, regenerate the worker script with `npx msw init public/`.

## Pre-commit Hook

On every commit, `lint-staged` runs ESLint (`--fix`) and Prettier on staged files (`.husky/pre-commit`).

## CI

`.github/workflows/ci.yml` runs lint, typecheck, tests with coverage, and the production build on every push and pull request to `master`.

## License

[CC0 1.0](LICENSE) — public domain, use it however you like.
