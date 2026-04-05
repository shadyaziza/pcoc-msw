import countries from './data/countries.json';
import cities from './data/cities.json';
import seedGuests from './data/seed-guests.json';
import type {
  CreateOrUpdateGuestRequestBody,
  GuestListQueryParams,
  GuestListResponse,
  BulkStatusUpdateResponse,
  BulkStatusUpdateError,
  EmailCheckResponse,
} from './types/api-types';
import type { City, Country, Guest, GuestStatus } from './types/domain-types';

export const CountryList = countries as Country[];
export const CityList = cities as City[];
let guests = [...seedGuests] as Guest[];

export function getGuestById(id: string): Guest | undefined {
  return guests.find((g) => g.id === id);
}

export function getGuests(params: GuestListQueryParams): GuestListResponse {
  let result = guests;

  const currentPage = Number(params.page) || 1;
  const pageSize = Number(params.pageSize) || 10;
  const status = params.status;
  const countryCode = params.countryCode;
  const search = params.search;

  // filter
  if (status !== undefined) {
    result = result.filter((g) => g.status === status);
  }
  if (countryCode !== undefined) {
    result = result.filter((g) => g.countryCode === countryCode);
  }
  if (search !== undefined) {
    result = result.filter((g) => {
      const s = search.toLowerCase();

      return (
        g.firstName.toLowerCase().includes(s) ||
        g.lastName.toLowerCase().includes(s) ||
        g.email.toLowerCase().includes(s)
      );
    });
  }
  const total = result.length;
  const totalPages = Math.ceil(total / pageSize);

  // paginate
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  result = result.slice(start, end);

  return {
    data: result,
    total: total,
    totalPages: totalPages,
    page: currentPage,
    pageSize: pageSize,
  };
}

export function createGuest(body: CreateOrUpdateGuestRequestBody): Guest {
  const id = crypto.randomUUID();
  const guest = {
    id: id,
    ...body,
  };
  guests.push(guest);
  return guest;
}

export function updateGuest(
  id: string,
  body: CreateOrUpdateGuestRequestBody,
): Guest | undefined {
  const index = guests.findIndex((g) => g.id === id);
  if (index === -1) {
    return undefined;
  }
  const guest = {
    id: id,
    ...body,
  };
  guests[index] = guest;
  return guest;
}

type TransitionMap = {
  [K in GuestStatus]: GuestStatus[];
};

const allowedTransitions: TransitionMap = {
  reserved: ['checked-in', 'checked-out', 'cancelled'],
  'checked-in': ['checked-out', 'cancelled'],
  'checked-out': ['reserved', 'cancelled'],
  cancelled: ['reserved', 'checked-out'],
};

function canTransition(from: GuestStatus, to: GuestStatus) {
  return allowedTransitions[from].includes(to);
}
export type UpdateGuestStatusResult =
  | { success: true; guest: Guest }
  | { success: false; error: string };

export function updateGuestStatus(
  id: string,
  to: GuestStatus,
): UpdateGuestStatusResult {
  const index = guests.findIndex((g) => g.id === id);

  if (index === -1) {
    return { success: false, error: `cannot find guest id =${id}` };
  }

  const guest = guests[index];
  if (!guest) {
    return { success: false, error: `no guest found for id ${id}` };
  }

  if (guest.status === to) {
    return { success: true, guest: guest };
  }

  if (!canTransition(guest.status, to)) {
    return {
      success: false,
      error: `Invalid transition from ${guest.status} to ${to}`,
    };
  }

  const updatedGuest = { ...guest, status: to };
  guests[index] = updatedGuest;

  return { success: true, guest: updatedGuest };
}

export function bulkUpdateStatus(
  guestIds: string[],
  status: GuestStatus,
): BulkStatusUpdateResponse {
  const guests: Guest[] = [];

  let err: BulkStatusUpdateError[] = [];
  for (const id of guestIds) {
    const r = updateGuestStatus(id, status);
    switch (r.success) {
      case true:
        guests.push(r.guest);
        break;
      case false:
        err.push({ id: id, error: r.error });
        break;
    }
  }
  return { succeeded: guests, failed: err };
}

export function checkEmailAvailability(email: string): EmailCheckResponse {
  return { available: guests.every((g) => g.email !== email) };
}
