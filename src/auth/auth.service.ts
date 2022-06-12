import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/entities/user';
import { JwtPayload } from 'src/types';
import { UserService } from 'src/user/user.service';
import { comparePassword } from 'src/core/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user && comparePassword(pass, user.password)) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      username: user.username,
      id: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
