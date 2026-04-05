import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export async function setupMockServer() {
  const worker = setupWorker(...handlers);
  await worker.start({
    onUnhandledRequest: 'bypass', // don't intercept non-API requests
  });
}
