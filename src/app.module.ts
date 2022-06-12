import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './core/entities/user';
import { SeedingMiddleware } from './core/middlewares/seeding.middleware';
import { SeedingLogEntity } from './core/entities/seeding';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';
import * as path from 'path';
import { File } from './core/entities/file';
import { MemoryModule } from './memory/memory.module';
import { Memory } from './core/entities/memory';
import { readConfig } from './core/utils/config';

const dbConfig = readConfig();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'images'),
    }),
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [User, SeedingLogEntity, File, Memory],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      load: [],
    }),
    AuthModule,
    UserModule,
    FileModule,
    MemoryModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SeedingMiddleware).forRoutes('');
  }
}
