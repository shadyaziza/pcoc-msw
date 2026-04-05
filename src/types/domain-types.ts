export type BilingualName = {
  en: string;
  ar: string;
};

export type Country = {
  code: string;
  name: BilingualName;
  phonePrefix: string;
  phoneLength: number;
  flag: string;
};

export type City = {
  id: string;
  name: BilingualName;
  countryCode: string;
};

export type GuestStatus =
  | 'reserved'
  | 'checked-in'
  | 'checked-out'
  | 'cancelled';

export type RoomType = 'suite' | 'deluxe' | 'standard';

export type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  cityId: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: RoomType;
  status: GuestStatus;
};
