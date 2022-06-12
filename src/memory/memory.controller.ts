import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CreateOneDto, findOneDto } from './memory.dto';
import { MemoryService } from './memory.service';

@Controller('memory')
export class MemoryController {
  constructor(private memoryService: MemoryService) {}

  @Post('createOne')
  async createOne(@Body() body: CreateOneDto) {
    const code = await this.memoryService.createOne(body.content);

    if (code === '') {
      throw new BadRequestException('生成失败');
    }

    return code;
  }

  @Post('findOne')
  async findOne(@Body() body: findOneDto) {
    const result = await this.memoryService.findOneByCode(body.code);

    if (result == null) {
      throw new BadRequestException('未找到相应内容');
    }

    return result;
  }
}
