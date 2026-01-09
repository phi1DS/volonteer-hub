import { test, expect } from '@playwright/test';
import { addYears, format } from 'date-fns';
import { createTask as dbHelperCreateTask, pruneDB as databaseHelperPruneDB } from './helpers/databaseHelpers';

test.describe('Backoffice page tests', () => {

  test.afterEach(async ({ request: apiRequest }) => {
    await databaseHelperPruneDB(apiRequest);
  });

  test('User sees task AC1: Task shows up on task page', async ({ page, request: apiRequest }, testInfo) => {
    const taskSubject = `Help with cleaning dishes ${testInfo.project.name}`;
    await dbHelperCreateTask(apiRequest, { subject: taskSubject, user_id: 1 });

    await page.goto('/dashboard');

    await expect(page.getByText(taskSubject)).toBeVisible();
  });

  test('User create task AC1: Successfully create a task', async ({ page }, testInfo) => {
    await page.goto('/dashboard');

    const startDate = format(addYears(new Date(), 1), "yyyy-MM-dd'T'HH:mm");
    const endDate = format(addYears(new Date(), 2), "yyyy-MM-dd'T'HH:mm");
    const taskSubject = `Help with oranges ${testInfo.project.name}`;

    await page.getByRole('button', { name: 'Create New Task' }).click();
    await page.getByRole('textbox', { name: 'Sujet *' }).fill(taskSubject);
    await page.getByRole('textbox', { name: 'Message *' }).fill('My Message');
    await page.getByRole('textbox', { name: 'Organisation' }).fill('My Organisation');
    await page.getByRole('textbox', { name: 'Contact information *' }).fill('06 06 76 87 98');
    await page.locator('input[name="date_start"]').fill(startDate);
    await page.locator('input[name="date_end"]').fill(endDate);

    await page.getByRole('button', { name: 'Create Task' }).click();

    await expect(page.getByText(taskSubject)).toBeVisible();
  });

  test('User close Task AC1: Successfully close task', async ({ page, request: apiRequest }, testInfo) => {
    const taskSubject = `Help with furniture ${testInfo.project.name}`;
    await dbHelperCreateTask(apiRequest, { subject: taskSubject, user_id: 1 });

    await page.goto('/dashboard');

    const taskCard = page.locator('[data-slot="card"]', {
      has: page.getByText(taskSubject),
    });

    await expect(taskCard).toBeVisible();

    await taskCard.getByRole('button', { name: 'Close Task' }).click();
    await page.locator('[data-slot="dialog-content"]').getByRole('button', { name: 'Close task' }).click();

    await expect(taskCard).not.toBeVisible();
  });

  test('User update Task AC1: Successfully update task', async ({ page, request: apiRequest }, testInfo) => {
    const taskSubject = `Help with groceries ${testInfo.project.name}`;
    await dbHelperCreateTask(apiRequest, { subject: taskSubject, user_id: 1 });
    
    await page.goto('/dashboard');

    const taskCard = page.locator('[data-slot="card"]', {
      has: page.getByText(taskSubject),
    });

    const newTaskSubject = `Help with fruits ${testInfo.project.name}`;
    await taskCard.getByRole('button', { name: 'Update' }).click();
    await page.getByRole('textbox', { name: 'Sujet *' }).fill(newTaskSubject);
    await page.getByRole('button', { name: 'Update Task' }).click();

    await expect(page.getByText(newTaskSubject)).toBeVisible();
  });
});
