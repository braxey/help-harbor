import { faker } from '@faker-js/faker';
import { User } from '../../models/user';
import { hashPassword } from '../../services/authService';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

interface UserSeederInterface {
  uuid: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string,
  unhashedPassword: string;
}

class UserSeeder {
  private uuid: string;
  private first_name: string;
  private last_name: string;
  private username: string;
  private email: string;
  private password: string;
  private hashedPassword: string;

  constructor() {
    this.uuid = uuidv4();
    this.first_name = faker.person.firstName();
    this.last_name = faker.person.lastName();
    this.username = faker.internet.userName();
    this.email = faker.internet.email().toLowerCase();
    this.password = faker.internet.password();
    this.hashedPassword = '';
  }

  async build(): Promise<UserSeederInterface> {
    this.hashedPassword = await hashPassword(this.password);

    const newUser = new User({
      uuid: this.uuid,
      first_name: this.first_name,
      last_name: this.last_name,
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
      uuid: this.last_name,
      firstName: this.first_name,
      lastName: this.last_name,
      username: this.username,
      email: this.email,
      password: this.hashedPassword,
      unhashedPassword: this.password,
    }
  }
}

export { UserSeeder, UserSeederInterface };
