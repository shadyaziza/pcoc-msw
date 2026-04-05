import { http, HttpResponse, delay } from 'msw';
import type { LoginRequestBody } from '../types/api-types';

function checkAuth(body: LoginRequestBody): boolean {
  if (body.email !== 'admin@pcoc.com' || body.password !== 'password123') {
    return false;
  }
  return true;
}

const authHandler = http.post('*/api/auth/login', async ({ request }) => {
  const { email, password } = (await request.json()) as LoginRequestBody;

  await delay();

  if (!checkAuth({ email, password })) {
    return HttpResponse.json(
      {
        error: 'wrong credentials',
      },
      { status: 401 },
    );
  }

  return HttpResponse.json(
    {
      token: 'fake-token',
      user: {
        id: 'fake-id',
        role: 'admin',
        name: email,
        email: email,
      },
    },
    { status: 200 },
  );
});

export const authHandlers = [authHandler];
