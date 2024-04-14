import supertest from 'supertest';
import { app, server } from '../../server';
import { UserSeeder, UserSeederInterface } from '../seeders/user';
import { AuthPack, logUserIn } from '../testHelpers';
import { connectToDatabase, disconnectFromDatabase } from '../../db';

const request = supertest(app);

describe('Example Controller', () => {

    let user: UserSeederInterface;
    let auth: AuthPack;

    beforeAll(async () => {
        await connectToDatabase();

        user = await (new UserSeeder()).build();
        auth = await logUserIn(user.email, user.unhashedPassword);
    });

    afterAll(async () => {
        await disconnectFromDatabase();
        server.close();
    })

    test('should return example data', async () => {
        const response = (await request.get('/api/example').set('Authorization', 'Bearer ' + auth.jwtToken).set('Cookie', auth.sessionCookie));

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: 'This is example data' });
    });
});
