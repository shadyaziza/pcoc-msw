import { http, HttpResponse, delay } from 'msw';
import type {
  BulkStatusUpdateRequestBody,
  CreateOrUpdateGuestRequestBody,
  GuestListQueryParams,
  StatusUpdateRequestBody,
} from '../types/api-types';
import type { GuestStatus } from '../types/domain-types';
import {
  bulkUpdateStatus,
  checkEmailAvailability,
  createGuest,
  getGuestById,
  getGuests,
  updateGuest,
  updateGuestStatus,
} from '../store';

const listGuestsHandler = http.get('/api/guests', async ({ request }) => {
  let queryParams: GuestListQueryParams;
  const url = new URL(request.url);

  queryParams = {
    page: url.searchParams.get('page') || undefined,
    pageSize: url.searchParams.get('pageSize') || undefined,
    search: url.searchParams.get('search') || undefined,
    status: (url.searchParams.get('status') as GuestStatus) || undefined,
    countryCode: url.searchParams.get('countryCode') || undefined,
  };
  await delay();
  const response = getGuests(queryParams);
  return HttpResponse.json(response, { status: 200 });
});

const getGuestHandler = http.get<{ id: string }>(
  '/api/guests/:id',
  async ({ params }) => {
    const { id } = params;
    await delay();

    const guest = getGuestById(id);
    if (guest) {
      return HttpResponse.json(guest, { status: 200 });
    } else {
      return HttpResponse.json(
        {
          error: 'guest with such id not found',
        },
        { status: 404 },
      );
    }
  },
);

const createGuestHandler = http.post('/api/guests', async ({ request }) => {
  const guestIn = (await request.json()) as CreateOrUpdateGuestRequestBody;

  await delay();

  const requiredCount = 10;
  if (
    Object.keys(guestIn).length < requiredCount ||
    Object.values(guestIn).some((v) => !v)
  ) {
    return HttpResponse.json(
      { error: 'some fields are missing for guest creation' },
      { status: 400 },
    );
  }

  const guestOut = createGuest(guestIn);

  return HttpResponse.json(guestOut, { status: 201 });
});

const updateGuestHandler = http.put<{ id: string }>(
  '/api/guests/:id',
  async ({ params, request }) => {
    const { id } = params;
    const guestIn = (await request.json()) as CreateOrUpdateGuestRequestBody;
    await delay();
    const result = updateGuest(id, guestIn);
    if (!result.success) {
      const status = result.reason === 'not_found' ? 404 : 422;
      return HttpResponse.json({ error: result.error }, { status });
    }
    return HttpResponse.json(result.guest, { status: 200 });
  },
);

const updateGuestStatusHandler = http.patch<{ id: string }>(
  '/api/guests/:id/status',
  async ({ params, request }) => {
    const { id } = params;
    const { status } = (await request.json()) as StatusUpdateRequestBody;
    await delay();
    const result = updateGuestStatus(id, status);
    switch (result.success) {
      case true:
        return HttpResponse.json(result.guest, { status: 200 });
      case false:
        return HttpResponse.json({ error: result.error }, { status: 422 });
    }
  },
);

const updateBulkGuestStatusHandler = http.patch(
  '/api/guests/bulk-status',
  async ({ request }) => {
    const { guestIds, status } =
      (await request.json()) as BulkStatusUpdateRequestBody;
    await delay();
    const result = bulkUpdateStatus(guestIds, status);

    return HttpResponse.json(result, { status: 200 });
  },
);

const checkEmailHandler = http.get(
  '/api/guests/check-email',
  async ({ request }) => {
    const url = new URL(request.url);

    const email = url.searchParams.get('email');

    await delay();
    if (!email) {
      return HttpResponse.json(
        { error: 'invalid email value' },
        { status: 400 },
      );
    }
    const result = checkEmailAvailability(email);

    return HttpResponse.json(result, { status: 200 });
  },
);

export const guestHandlers = [
  listGuestsHandler,
  updateBulkGuestStatusHandler,
  checkEmailHandler,
  getGuestHandler,
  createGuestHandler,
  updateGuestHandler,
  updateGuestStatusHandler,
];
