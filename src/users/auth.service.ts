import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException('User already exists');
    }

    const passwordHash = await argon2.hash(password);

    return this.usersService.create(email, passwordHash);
  }

  signin() {}
}
