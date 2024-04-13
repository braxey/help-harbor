import supertest from 'supertest';
import { app, server } from '../../server';
import { comparePasswords } from '../../services/authService';
import { User, UserInterface } from '../../models/user';
import { UserSeeder, UserSeederInterface } from '../seeders/user';
import { connectToDatabase, disconnectFromDatabase } from '../../db';
import { faker } from '@faker-js/faker';

const request = supertest(app);

interface RegisterPayload {
    data: {
        username: string;
        email: string;
        password: string;
    };
}

describe('Authentication Controller', () => {

    let user: UserSeederInterface;

    beforeAll(async () => {
        await connectToDatabase();

        user = await (new UserSeeder().build());
    });

    afterAll(async () => {
        await disconnectFromDatabase();
        server.close();
    })

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

        const registeredUser: UserInterface | null = await User.findOne({ email: payload.data.email });
        
        expect(registeredUser).toBeDefined();
        expect(registeredUser?.username).toBe(payload.data.username);
        expect(registeredUser?.email).toBe(payload.data.email);
        expect(await comparePasswords(payload.data.password, registeredUser?.password?? '')).toBeTruthy();
    });

    test('emails must be unique', async () => {
        let payload: RegisterPayload = createRegisterPayload();
        payload.data.email = user.email;

        const response = await request.post('/authentication/register').send(payload);

        expect(response.status).toBe(409);
        expect(response.body).toEqual({ errors: 'email already in use' });
    });

    // test('registration validation', )
});

function createRegisterPayload(): RegisterPayload {
    const username = faker.internet.userName();
    const email = faker.internet.email().toLowerCase();
    const password = faker.internet.password();

    return {
        data: {
            username: username,
            email: email,
            password: password,
        }
    };
}
