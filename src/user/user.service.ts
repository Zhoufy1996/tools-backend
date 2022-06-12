import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/core/entities/user';
import { hashPassword } from 'src/core/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findOneById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createOne(username, password) {
    const user = new User();
    user.username = username;
    user.password = hashPassword(password);
    user.role = UserRole.NORMAL;
    return this.userRepository.save(user);
  }

  async validateExist(username) {
    return this.findOne(username) != null;
  }

  // 不支持ignore
  async createMany(users: User[]) {
    const oldUsers = await this.userRepository.find({
      where: users.map((user) => {
        return { username: user.username };
      }),
    });

    const oldUsersMap = new Map<string, boolean>();
    oldUsers.forEach((user) => {
      oldUsersMap.set(user.username, true);
    });

    const newUsers = users.filter((user) => {
      return !oldUsersMap.get(user.username);
    });

    return this.userRepository.save(newUsers);
  }
}
