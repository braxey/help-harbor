import { faker } from '@faker-js/faker';
import { User } from '../../models/user';
import { hashPassword } from '../../services/authService';
import validator from 'validator';

interface UserSeederInterface {
  username: string;
  email: string;
  password: string,
  unhashedPassword: string;
}

class UserSeeder {
  private username: string;
  private email: string;
  private password: string;
  private hashedPassword: string;

  constructor() {
    this.username = faker.internet.userName();
    this.email = faker.internet.email().toLowerCase();
    this.password = faker.internet.password();
    this.hashedPassword = '';
  }

  async build(): Promise<UserSeederInterface> {
    this.hashedPassword = await hashPassword(this.password);

    const newUser = new User({
      username: this.username,
      email: validator.normalizeEmail(this.email, { all_lowercase: true }),
      password: this.hashedPassword,
    });

    try {
      await newUser.save();
      return this.jsonSerialize();
    } catch (error) {
      console.error('Error saving user:', error);
      return {} as UserSeederInterface;
    }
  }

  jsonSerialize(): UserSeederInterface {
    return {
      username: this.username,
      email: this.email,
      password: this.hashedPassword,
      unhashedPassword: this.password,
    }
  }
}

export { UserSeeder, UserSeederInterface };
