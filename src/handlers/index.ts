import { authHandlers } from './auth';
import { CitiesHandler as citiesHandler } from './cities';
import { CountriesHandler as countriesHandler } from './countries';
import { guestHandlers } from './guests';

export const handlers = [
  ...authHandlers,
  ...guestHandlers,
  ...citiesHandler,
  ...countriesHandler,
];
