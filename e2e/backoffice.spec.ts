import { test, expect } from '@playwright/test';
import { addYears, format } from 'date-fns';
import { createTask as dbHelperCreateTask, pruneDB as databaseHelperPruneDB } from './helpers/databaseHelpers';

test.describe('Backoffice page tests', () => {

  // test.beforeEach(async ({ request: apiRequest }) => {
  //   await databaseHelperPruneDB(apiRequest);
  // });

  test('User sees task AC1: Task shows up on task page', async ({ page, request: apiRequest }) => {
    const taskSubject = 'Help with cleaning dishes';
    await dbHelperCreateTask(apiRequest, { subject: taskSubject, user_id: 1 });

    await page.goto('/dashboard');

    await expect(page.getByText(taskSubject)).toBeVisible();
  });

  test('User create task AC1: Successfully create a task', async ({ page }) => {
    await page.goto('/dashboard');

    // Form filling
    const startDate = format(addYears(new Date(), 1), "yyyy-MM-dd'T'HH:mm");
    const endDate = format(addYears(new Date(), 2), "yyyy-MM-dd'T'HH:mm");

    await page.getByRole('button', { name: 'Create New Task' }).click();
    await page.getByRole('textbox', { name: 'Sujet *' }).fill('Help with oranges');
    await page.getByRole('textbox', { name: 'Message *' }).fill('My Message');
    await page.getByRole('textbox', { name: 'Organisation' }).fill('My Organisation');
    await page.getByRole('textbox', { name: 'Contact information *' }).fill('06 06 76 87 98');
    await page.locator('input[name="date_start"]').fill(startDate);
    await page.locator('input[name="date_end"]').fill(endDate);

    // Submitting
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Expectations
    await expect(page.getByRole('listitem').filter({ hasText: 'Task created' })).toBeVisible();
    await expect(page.getByText('Help with oranges')).toBeVisible();
  });

  test('User close Task AC1: Successfully close task', async ({ page, request: apiRequest }) => {
    const taskSubject = 'Help with furniture';
    await dbHelperCreateTask(apiRequest, { subject: taskSubject, user_id: 1 });

    await page.goto('/dashboard');

    const taskCard = page.locator('[data-slot="card"]', {
      has: page.getByText(taskSubject),
    });

    await expect(taskCard).toBeVisible();

    await taskCard.getByRole('button', { name: 'Close Task' }).click();
    await page.locator('[data-slot="dialog-content"]').getByRole('button', { name: 'Close task' }).click();

    await expect(page.getByText('Task marked as closed')).toBeVisible();
    await expect(taskCard).not.toBeVisible();
  });

  test('User update Task AC1: Successfully update task', async ({ page, request: apiRequest }) => {
    const taskSubject = 'Help with groceries';
    await dbHelperCreateTask(apiRequest, { subject: taskSubject, user_id: 1 });
    
    await page.goto('/dashboard');

    const taskCard = page.locator('[data-slot="card"]', {
      has: page.getByText(taskSubject),
    });

    await taskCard.getByRole('button', { name: 'Update' }).click();
    await page.getByRole('textbox', { name: 'Sujet *' }).fill('Help with fruits');
    await page.getByRole('button', { name: 'Update Task' }).click();

    await expect(page.getByText('Task updated')).toBeVisible();
    await expect(page.getByText('Help with fruits')).toBeVisible();
  });
});
