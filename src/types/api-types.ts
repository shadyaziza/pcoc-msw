import type { Guest, GuestStatus, RoomType } from './domain-types';

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    role: 'admin';
    name: string;
    email: string;
  };
};

export type CreateOrUpdateGuestRequestBody = Omit<Guest, 'id'>;

export type GuestListResponse = {
  data: Guest[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type GuestListQueryParams = {
  page?: string;
  pageSize?: string;
  search?: string;
  status?: GuestStatus;
  countryCode?: string;
};

export type StatusUpdateRequestBody = {
  status: GuestStatus;
};

export type BulkStatusUpdateRequestBody = {
  guestIds: string[];
  status: GuestStatus;
};

export type BulkStatusUpdateError = {
  id: string;
  error: string;
};
export type BulkStatusUpdateResponse = {
  succeeded: Guest[];
  failed: BulkStatusUpdateError[];
};

export type EmailCheckResponse = {
  available: boolean;
};
