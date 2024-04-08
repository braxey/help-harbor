import * as argon2 from 'argon2';

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
