import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File, FileType } from 'src/core/entities/file';
import { downloadImage } from 'src/core/utils/downloadImage';
import { Repository } from 'typeorm';
import * as path from 'path';
import { filesBasePath } from 'src/core/utils/constants';
import sizeOf from 'image-size';
import { readFile } from 'src/core/utils/file';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  downloadImage(url: string) {
    return downloadImage(url);
  }

  async saveOneImageFromUrl(url: string, username: string) {
    const fileName = await this.downloadImage(url);
    const file = new File();
    file.username = username;
    file.fileName = fileName;
    file.type = FileType.IMAGE;
    const data = await readFile(path.join(filesBasePath, fileName));
    const { width = 0, height = 0 } = sizeOf(data);
    file.width = width;
    file.height = height;
    file.size = data.length;
    const res = await this.fileRepository.save(file);

    return res;
  }
}
