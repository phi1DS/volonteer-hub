import { test, expect } from '@playwright/test';
import { addYears, format } from 'date-fns';

test.describe('Backoffice page tests', () => {

  test('test', async ({ page }) => {
    await page.goto('/dashboard'); // root as var TODO

    const header = page.locator('h1', { hasText: 'My created tasks' });
    await expect(header).toBeVisible();
  });

  test('User create task AC1: Successfully creates a task', async ({ page }) => {
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
});
