import { APIRequestContext } from '@playwright/test';

export async function createTask(apiRequest: APIRequestContext, data: Record<string, any> = {}) {
  const res = await apiRequest.post('/e2e/factory/task', { data });

  if (res.status() !== 200) {
    throw new Error(`Failed to create task: ${res.status()} ${await res.text()}`);
  }

  return res.json();
}

export async function pruneDB(apiRequest: APIRequestContext) {
  await apiRequest.post('/e2e/prune-db');
}
