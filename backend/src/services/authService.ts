import * as argon2 from 'argon2';
import jwt, { JwtPayload } from 'jsonwebtoken';

/**
 * passwords
 */

export async function hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    try {
        return await argon2.verify(hashedPassword, password);
    } catch (error) {
        console.error("ARGON2 FAILURE:", error);
        return false;
    }
}

/**
 * json web tokens
 */



export function generateJwtToken(_email: string): string {
    return jwt.sign({
        email: _email
    }, process.env.JWT_TOKEN_SECRET || 'secret', { expiresIn: process.env.JWT_EXPIRY_TIME + 's' })
}

export function verifyJwtToken(_email: string, token: string): boolean {
    try {
        if (!token) {
            return false;
        }

        let decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET || 'secret') as JwtPayload;
        return decoded.email && decoded.email === _email;
    } catch (error) {
        return false;
    }
}

