import supertest from 'supertest';
import { app, server } from '../../server';
import { comparePasswords } from '../../services/authService';
import { User, UserInterface } from '../../models/user';
import { UserSeeder, UserSeederInterface } from '../seeders/user';
import { connectToDatabase, disconnectFromDatabase } from '../../db';
import { faker } from '@faker-js/faker';
import { AuthPack, createErrorArray, logUserIn, logUserOut } from '../testHelpers';
import validator from 'validator';
const request = supertest(app);

interface RegisterPayload {
    data: {
        username: string;
        email: string;
        password: string;
    };
}

interface LoginPayload {
    data: {
        email: string;
        password: string;
    }
}

describe('Authentication Controller', () => {

    let user: UserSeederInterface;

    beforeAll(async () => {
        await connectToDatabase();
    });

    afterAll(async () => {
        await disconnectFromDatabase();
        server.close();
    })

    beforeEach(async () => {
        user = await (new UserSeeder().build());
    });

    /**
     * ******************
     * user registration
     * ******************
     */

    test('can register new user', async () => {
        const payload: RegisterPayload = createRegisterPayload();

        const response = await request.post('/authentication/register').send(payload);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'success' });

        let normalizedEmail = validator.normalizeEmail(payload.data.email, { all_lowercase: true }).toString();
        const registeredUser: UserInterface | null = await User.findOne({ email: normalizedEmail });
        
        expect(registeredUser).toBeDefined();
        expect(registeredUser?.username).toBe(payload.data.username);
        expect(registeredUser?.email).toBe(normalizedEmail);
        expect(await comparePasswords(payload.data.password, registeredUser?.password?? '')).toBeTruthy();
    });

    test('emails must be unique', async () => {
        let payload: RegisterPayload = createRegisterPayload();
        payload.data.email = user.email;

        const response = await request.post('/authentication/register').send(payload);

        expect(response.status).toBe(409);
        expect(response.body).toEqual({ errors: 'email already in use' });
    });

    test('registration validation', async () => {
        // no username
        let invalidPayload: RegisterPayload = createRegisterPayload({data: {username: ''}});
        let response = await request.post('/authentication/register').send(invalidPayload);

        expect(response.status).toBe(400);
        expect(response.body).toEqual(createErrorArray('username', invalidPayload.data.username, 'username cannot be empty'));

        // invalid email
        invalidPayload = createRegisterPayload({data: {email: 'anything'}});
        response = await request.post('/authentication/register').send(invalidPayload);

        expect(response.status).toBe(400);
        expect(response.body).toEqual(createErrorArray('email', invalidPayload.data.email, 'invalid email'));

        // password too short
        invalidPayload = createRegisterPayload({data: {password: 'short'}});
        response = await request.post('/authentication/register').send(invalidPayload);

        expect(response.status).toBe(400);
        expect(response.body).toEqual(createErrorArray('password', invalidPayload.data.password, 'password must be at least 8 chars'));
    })

    /**
     * ******************
     * login
     * ******************
     */

    test('user can log in', async () => {
        const payload = createLoginPayload(user.email, user.unhashedPassword);
        const response = await request.post('/authentication/login').send(payload);

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    test('user not found', async () => {
        const payload = createLoginPayload(faker.internet.email(), faker.internet.password().toString());
        const response = await request.post('/authentication/login').send(payload);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ errors: 'user not found' });
    });

    test('wrong password', async () => {
        const payload = createLoginPayload(user.email, faker.internet.password().toString());
        const response = await request.post('/authentication/login').send(payload);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ errors: 'invalid password' });
    });

    test('login validation', async () => {
        // invalid email
        let invalidPayload = createLoginPayload('anything', faker.internet.password().toString());
        let response = await request.post('/authentication/login').send(invalidPayload);

        expect(response.status).toBe(400);
        expect(response.body).toEqual(createErrorArray('email', invalidPayload.data.email, 'invalid email'));

        // password too short
        invalidPayload = createLoginPayload(faker.internet.email(), 'short');
        response = await request.post('/authentication/login').send(invalidPayload);

        expect(response.status).toBe(400);
        expect(response.body).toEqual(createErrorArray('password', invalidPayload.data.password, 'invalid password'));
    });

    /**
     * ******************
     * logout
     * ******************
     */

    test('can log out', async () => {
        let auth: AuthPack = await logUserIn(user.email, user.unhashedPassword);

        const response = await logUserOut(auth);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'success' });
    });
});

function createRegisterPayload(overrides?: any): RegisterPayload {
    const username = overrides?.data.username?? faker.internet.userName();
    const email = overrides?.data.email?? faker.internet.email().toLowerCase();
    const password = overrides?.data.password?? faker.internet.password();

    return {
        data: {
            username: username,
            email: email,
            password: password,
        }
    };
}

function createLoginPayload(email: string, password: string): LoginPayload {
    return {
        data: {
            email: email,
            password: password
        }
    };
}
