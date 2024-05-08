import { test, expect } from '@playwright/test';

import translations from '@/i18n/en.json';

test('Inital content', async ({ page }) => {
	const url = process.env.BASE_URL ?? 'http://127.0.0.1:3000';

	const { title, description } = translations.landing.hero;

	await page.goto(url);

	expect(page).toHaveURL(url);

	const h1 = page.getByRole('heading', {
		name: title,
		exact: true,
	});

	const h2 = page.getByRole('heading', {
		name: description,
		exact: true,
	});

	expect(h1).toBeVisible();
	expect(h2).toBeVisible();
});
