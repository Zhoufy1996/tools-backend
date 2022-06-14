import { IsString } from 'class-validator';

export class CreateMemoryDto {
  @IsString()
  content: string;
}
