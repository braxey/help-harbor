import supertest from 'supertest';
import { app } from '../server';
const request = supertest(app);

export interface AuthPack {
    sessionCookie: string,
    jwtToken: string
}

export async function logUserIn(_email: string, _password: string): Promise<AuthPack> {
    let res = await request.post('/authentication/login').send({
        data: {
            email: _email,
            password: _password,
        }
    });

    return {
        sessionCookie: res.headers['set-cookie']?? '',
        jwtToken: res.body.token?? '',
    };
}

export async function logUserOut(req: Request) {
    return await request.post('/authentication/logout');
}

export function createErrorArray(field: string, value: any, message: string) {
    return {
        errors: [{
            type: 'field',
            value: value,
            msg: message,
            path: 'data.' + field,
            location: 'body'
        }]
    }
}
