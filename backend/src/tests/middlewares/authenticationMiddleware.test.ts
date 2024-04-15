import supertest from 'supertest';
import { app, server } from '../../server';
import { UserSeeder, UserSeederInterface } from '../seeders/user';
import { connectToDatabase, disconnectFromDatabase } from '../../db';
import { AuthPack, logUserIn } from '../testHelpers';
const request = supertest(app);

describe('Authentication Middleware', () => {

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

    test('logged in user with valid jwt token can pass', async () => {
        let auth: AuthPack = await logUserIn(user.email, user.unhashedPassword);
        const response = await request.get('/authentication/logout')
            .set('Authorization', 'Bearer ' + auth.jwtToken)
            .set('Cookie', auth.sessionCookie)
            .send({ dryRun: true });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'passes authenticationMiddleware' });
    });

    test('logged in user without valid jwt token cannot pass', async () => {
        let auth: AuthPack = await logUserIn(user.email, user.unhashedPassword);
        let response = await request.get('/authentication/logout')
            .set('Authorization', 'Bearer ' + auth.jwtToken + 'a')
            .set('Cookie', auth.sessionCookie)
            .send({ data: { dryRun: true } });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ errors: 'Unauthorized' });

        response = await request.get('/authentication/logout')
            .set('Cookie', auth.sessionCookie)
            .send({ data: { dryRun: true } });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ errors: 'Unauthorized' });
    });

    test('user cannot pass if not logged in', async () => {
        let response = await request.get('/authentication/logout');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ errors: 'Unauthorized' });

        response = await request.get('/authentication/logout');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ errors: 'Unauthorized' });
    });
});
