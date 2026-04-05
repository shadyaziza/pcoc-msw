# pcoc-msw

MSW-based mock backend for the PCOC Guest Management React Training Exercise.

## Install

```bash
bun add -D github:shadyaziza/pcoc-msw#main
bun add -D msw
bunx msw init public/ --save
```

## Usage

Call `setupMockServer()` once at your app's entry point (e.g., `main.tsx`), **before** rendering:

```ts
import { setupMockServer } from 'pcoc-msw';

await setupMockServer();

// then render your app
```

This starts MSW in the browser, intercepting all `/api/*` requests. No real backend needed.

## API Docs

The package includes an interactive API reference (OpenAPI 3.0 spec powered by [Scalar](https://scalar.com)). Add the Vite plugin to your config:

```ts
// vite.config.ts
import { pcocApiDocs } from 'pcoc-msw/vite';

export default defineConfig({
  plugins: [pcocApiDocs(), /* ...your other plugins */],
});
```

Then visit `/api/docs` in the browser while the dev server is running (e.g., `http://localhost:5173/api/docs`).

The docs cover all endpoints, request/response schemas, status codes, and business rules. **Use this as your primary API reference.**

You can also access the raw OpenAPI spec at `/api/docs/openapi.yaml`.

## Available Endpoints

| Method  | Endpoint                             | Description                                      |
| ------- | ------------------------------------ | ------------------------------------------------ |
| `POST`  | `/api/auth/login`                    | Login (`admin@pcoc.com` / `password123`)         |
| `GET`   | `/api/guests`                        | Paginated guest list (query: page, pageSize, search, status, countryCode) |
| `GET`   | `/api/guests/:id`                    | Single guest by ID                               |
| `POST`  | `/api/guests`                        | Create a guest                                   |
| `PUT`   | `/api/guests/:id`                    | Update a guest (enforces status transition rules) |
| `PATCH` | `/api/guests/:id/status`             | Change guest status (422 on invalid transitions) |
| `PATCH` | `/api/guests/bulk-status`            | Bulk status update                               |
| `GET`   | `/api/guests/check-email`            | Check email uniqueness (query: `email`)          |
| `GET`   | `/api/countries`                     | All countries with flags and phone info           |
| `GET`   | `/api/countries/:countryCode/cities` | Cities for a country                             |

## Status Transition Rules

Not all status changes are allowed. The server returns `422` for:

- `checked-out` → `checked-in`
- `cancelled` → `checked-in`

This applies to both `PATCH /status` and `PUT /guests/:id`.
