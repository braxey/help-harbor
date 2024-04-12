import { faker } from '@faker-js/faker';
import { User, UserInterface } from '../../models/user';
import { hashPassword } from '../../services/authService';

class UserSeeder {
  static async build(): Promise<UserInterface> {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      hashedPassword,
    });

    try {
      let savedUser = (await newUser.save()).toJSON();
      savedUser.password = password;
      return savedUser;
    } catch (error) {
      console.error('Error saving user:', error);
      return {} as UserInterface;
    }
  }
}

export default UserSeeder;
