import { setupServer } from 'msw/node';
import { handlers } from '..';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import type { LoginRequestBody } from '../../types/api-types';

const server = setupServer(...handlers);

describe('POST /api/auth/login', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());
  it('correct auth payload', async () => {
    const body: LoginRequestBody = {
      email: 'admin@pcoc.com',
      password: 'password123',
    };
    const r = await fetch('http://localhost/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const res = await r.json();
    expect(r.status).toBe(200);
    expect(res).toHaveProperty('token');
    expect(typeof res.token).toBe('string');
    expect(res).toHaveProperty('user');
    expect(res.user.email).toBe('admin@pcoc.com');
  });
  it('incorrect auth payload', async () => {
    const body: LoginRequestBody = {
      email: 'admin@pcoc.com',
      password: 'xyz',
    };
    const r = await fetch('http://localhost/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const res = await r.json();
    expect(r.status).toBe(401);
    expect(res).toHaveProperty('error');
    expect(res.error).toBe('wrong credentials');
  });
});
