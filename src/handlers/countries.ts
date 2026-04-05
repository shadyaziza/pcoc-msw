import { delay, http, HttpResponse } from 'msw';
import { CountryList } from '../store';
import type { Country } from '../types/domain-types';

const listCountriesHandler = http.get('/api/countries', async ({ request }) => {
  await delay();
  let countries: Country[] = [];
  for (const c of CountryList) {
    countries.push({
      ...c,
      flag: `https://flagcdn.com/w40/${c.code}.png`,
    });
  }
  return HttpResponse.json(countries);
});

export const CountriesHandler = [listCountriesHandler];
