import { IsString } from 'class-validator';

export class CreateOneDto {
  @IsString()
  content: string;
}

export class findOneDto {
  @IsString()
  code: string;
}
