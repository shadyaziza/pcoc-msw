# @pcoc/mock-server

MSW-based mock backend for the PCOC Guest Management React Training Exercise.

## Install

```bash
bun add -D github:MOFA-Qatar/pcoc-msw
```

`msw` is a peer dependency — install it alongside:

```bash
bun add -D msw
```

Then initialize the MSW service worker in your project's `public/` directory:

```bash
bunx msw init public/ --save
```

## Usage

Call `setupMockServer()` once at your app's entry point (e.g., `main.tsx`), **before** rendering:

```ts
import { setupMockServer } from '@pcoc/mock-server';

await setupMockServer();

// then render your app
```

This starts MSW in the browser, intercepting all `/api/*` requests. No real backend needed.

## API Docs

The package includes an interactive API reference powered by Scalar. Add the Vite plugin to your config:

```ts
// vite.config.ts
import { pcocApiDocs } from 'pcoc-msw/vite';

export default defineConfig({
  plugins: [pcocApiDocs(), /* ...your other plugins */],
});
```

Then visit [http://localhost:5173/api/docs](http://localhost:5173/api/docs) while the dev server is running.

## Available Endpoints

| Method  | Endpoint                             | Description                                      |
| ------- | ------------------------------------ | ------------------------------------------------ |
| `POST`  | `/api/auth/login`                    | Login (`admin@pcoc.com` / `password123`)         |
| `GET`   | `/api/guests`                        | Paginated guest list (query: page, pageSize, search, status, countryCode) |
| `GET`   | `/api/guests/:id`                    | Single guest by ID                               |
| `POST`  | `/api/guests`                        | Create a guest                                   |
| `PUT`   | `/api/guests/:id`                    | Update a guest                                   |
| `PATCH` | `/api/guests/:id/status`             | Change guest status                              |
| `PATCH` | `/api/guests/bulk-status`            | Bulk status update                               |
| `GET`   | `/api/guests/check-email`            | Check email uniqueness (query: `email`)          |
| `GET`   | `/api/countries`                     | All countries                                    |
| `GET`   | `/api/countries/:countryCode/cities` | Cities for a country                             |
