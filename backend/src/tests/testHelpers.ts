import supertest from 'supertest';
import { app } from '../server';
const request = supertest(app);


export async function logUserIn(_email: string, _password: string) {
    await request.post('/authentication/login').send({
        email: _email,
        password: _password,
    });
}

export async function logUserOut(req: Request) {
    await request.post('/authentication/logout');
}
