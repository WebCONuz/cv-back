import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from '../files/files.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private mediaRepository: Repository<Media>,
    private readonly filesService: FilesService,
  ) {}

  async create(createMediaDto: CreateMediaDto, file: any) {
    const fileUrl = await this.filesService.createImage(file);
    const newData = await this.mediaRepository.save({
      ...createMediaDto,
      table_id: +createMediaDto.table_id,
      media_name: fileUrl,
    });
    return {
      message: 'created',
      data: newData,
    };
  }

  async findAll() {
    const allData = await this.mediaRepository.find();
    return allData;
  }

  async findOne(id: number) {
    const oneData = await this.mediaRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    return oneData;
  }

  async remove(id: number) {
    const data = await this.mediaRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Data is not found!');
    }

    const fileName = data.media_name;
    fs.unlinkSync(path.join(__dirname, '../', '/static', '/images', fileName));
    await this.mediaRepository.delete(id);

    return {
      message: 'deleted',
      id: data.id,
    };
  }
}
