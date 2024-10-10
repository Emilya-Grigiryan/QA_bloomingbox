import { test, expect } from '@playwright/test';
import { registerUser, loginAndSetCookies } from './page_actions';

test('Create user and extract token, then validate profile', async ({ request, browser }) => {
    const { firstName, lastName, responseBody } = await registerUser(request);
    
    expect(responseBody.status).toBe(200);
    expect(responseBody.data.user.firstName).toBe(firstName);

    const token = responseBody.data.token;

    const page = await loginAndSetCookies(browser, token);

    await page.goto("https://ksa.bloomingbox.dev/ae-en/profile/edit");

    const firstNameSelector = await page.getByPlaceholder('First Name');
    const lastNameSelector = await page.getByPlaceholder('Last Name');

    await expect(firstNameSelector).toHaveValue(firstName);
    await expect(lastNameSelector).toHaveValue(lastName);
});
