import { faker } from '@faker-js/faker';

export const registerUser = async (request) => {
    const firstName = faker.person.firstName('female');
    const lastName = faker.person.lastName('female');
    const email = faker.internet.email();
    
    const endpoint = 'https://ksa-api.bloomingbox.dev/auth/register/customer';
    
    const response = await request.post(endpoint, {
        headers: {
            'authorization': 'bearer',
            'city': 'dubai',
            'content-type': 'application/json',
            'country-code': 'ae',
            'language-code': 'en'
        },
        data: {
            firstName: firstName,
            lastName: lastName,
            mobileNumber: '+37498426420',
            email: email,
            birthDay: '1930-09-30T21:00:00.000Z',
            gender: 'Female',
            password: 'Qw!123456',
            passwordConfirmation: 'Qw!123456'
        }
    });

    const responseBody = await response.json();
    return { firstName, lastName, email, responseBody };
};

export const loginAndSetCookies = async (browser, token) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://ksa.bloomingbox.dev/ae-en");

    const cookie1 = {
        name: "deliveredTo",
        value: "sharjah",
        url: "https://ksa.bloomingbox.dev",
    };
    const cookie2 = {
        name: "token",
        value: token,
        url: "https://ksa.bloomingbox.dev",
    };
    await context.addCookies([cookie1, cookie2]);

    return page;
};
