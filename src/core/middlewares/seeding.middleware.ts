import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { SeedingLogEntity } from 'src/core/entities/seeding';
import { User, UserRole } from 'src/core/entities/user';
import { hashPassword } from 'src/core/utils/bcrypt';
import { EntityManager } from 'typeorm';

@Injectable()
export class SeedingMiddleware implements NestMiddleware {
  private isSeedingComplate: Promise<boolean>;

  constructor(private readonly entityManager: EntityManager) {}

  async use(req: Request, res: Response, next: (error?: any) => void) {
    if (await this.isSeedingComplate) {
      return next();
    }
    this.isSeedingComplate = (async () => {
      if (
        !(await this.entityManager.findOne(SeedingLogEntity, {
          where: {
            key: 'initial-seeding',
          },
        }))
      ) {
        await this.entityManager.transaction(
          async (transactionalEntityManager) => {
            const user = new User();
            user.username = 'zhoufeiyu';
            user.password = hashPassword('zhoufeiyu');
            user.role = UserRole.ADMIN;
            await transactionalEntityManager.save(user);
            const seed = new SeedingLogEntity();
            seed.key = 'initial-seeding';
            await transactionalEntityManager.save(seed);
          },
        );
      }

      return true;
    })();

    await this.isSeedingComplate;

    next();
  }
}
