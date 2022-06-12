import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtReq } from 'src/types';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  async getProfile(@Request() req: JwtReq) {
    const user = await this.userService.findOne(req.user.username);
    if (user == null) {
      throw new BadRequestException('找不到该用户');
    }

    return user;
  }
}
