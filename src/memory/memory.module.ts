import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memory } from 'src/core/entities/memory';
import { MemoryController } from './memory.controller';
import { MemoryService } from './memory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Memory])],
  controllers: [MemoryController],
  providers: [MemoryService],
})
export class MemoryModule {}
