import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMemoryDto } from './memory.dto';
import { MemoryService } from './memory.service';

@Controller('memory')
export class MemoryController {
  constructor(private memoryService: MemoryService) {}

  @Post()
  async create(@Body() createMemoryDto: CreateMemoryDto) {
    const code = await this.memoryService.createOne(createMemoryDto.content);

    if (code === '') {
      throw new BadRequestException('生成失败');
    }

    return {
      code,
    };
  }

  @Get(':code')
  async findOne(@Param('code') code: string) {
    const result = await this.memoryService.findOneByCode(code);

    if (result == null) {
      throw new BadRequestException('未找到相应内容');
    }

    return result;
  }
}
