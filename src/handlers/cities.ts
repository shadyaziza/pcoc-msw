import { delay, http, HttpResponse } from 'msw';
import { CityList } from '../store';

const listCitiesHandler = http.get<{ countryCode: string }>(
  '/api/countries/:countryCode/cities',
  async ({ params }) => {
    const { countryCode } = params;
    await delay();
    const list = CityList.filter((c) => c.countryCode === countryCode);

    if (list.length === 0) {
      return HttpResponse.json(
        { error: 'no cities for the specified countryCode' },
        { status: 404 },
      );
    }
    return HttpResponse.json(list);
  },
);

export const CitiesHandler = [listCitiesHandler];
