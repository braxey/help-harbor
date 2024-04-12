import supertest from 'supertest';
import { app, server } from '../../server';
import { UserInterface } from '../../models/user';
import UserSeeder from '../seeders/user';
import { logUserIn, logUserOut } from '../testHelpers';
import { connectToDatabase, disconnectFromDatabase } from '../../db';

const request = supertest(app);

describe('Example Controller', () => {

    let user: UserInterface;

    beforeAll(async () => {
        await connectToDatabase();

        user = await UserSeeder.build();
        logUserIn(user.email, user.password);
    });

    afterAll(async () => {
        await disconnectFromDatabase();
        server.close();
    })

    test('should return example data', async () => {
        const response = await request.get('/api/example');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: 'This is example data' });
    });
});
