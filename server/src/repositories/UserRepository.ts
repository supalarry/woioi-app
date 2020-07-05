import { User } from '../entity/User';
import { Response } from 'express';
import { hash, compare } from 'bcryptjs';
import { sendRefreshToken } from '../app/auth/sendRefreshToken'
import { createRefreshToken } from '../app/auth/auth';
import { getConnection } from 'typeorm';

export class UserRepository {
  async register(
    email: string,
    username: string,
    mainLang: string,
    password: string,
    res: Response
  ): Promise<User> {
    const hashedPassword = await hash(password, 12);
    await User.insert({
        email,
        username,
        mainLang,
        password: hashedPassword
    });
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('database error');
    }

    sendRefreshToken(res, await createRefreshToken(user!));
    return user;
  }

  async login(
    email: string,
    password: string,
    res: Response): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('invalid login');
    }
    const valid = await compare(password, user.password);
    if (!valid) {
        throw new Error('invalid login');
    }

    sendRefreshToken(res, await createRefreshToken(user!));
    return user;
  }

  async revokeRefreshTokenForUser(userId: number): Promise<Boolean> {
    try {
      await getConnection()
            .getRepository(User)
            .increment({ id: userId }, 'tokenVersion', 1);
      return (true);
    } catch (error) {
      return (false);
    }
  }
}
