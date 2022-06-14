import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memory } from 'src/core/entities/memory';
import { getRandomStr } from 'src/core/utils/random';
import { Repository } from 'typeorm';

@Injectable()
export class MemoryService {
  constructor(
    @InjectRepository(Memory)
    private memoryRepository: Repository<Memory>,
  ) {}

  findOneByCode(code: string) {
    return this.memoryRepository.findOne({
      where: {
        code,
      },
    });
  }

  async createOne(content: string) {
    const memory = new Memory();
    memory.content = content;
    let code = '';
    let time = 0;
    const maxTime = 5;
    while (code === '' && time < maxTime) {
      try {
        memory.code = getRandomStr(4);
        await this.memoryRepository.save(memory);
        code = memory.code;
      } catch (e) {
        time += 1;
      }
    }

    return code;
  }
}
