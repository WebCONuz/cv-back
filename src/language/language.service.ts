import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    const newData = await this.languageRepository.save(createLanguageDto);
    return {
      message: 'creaated',
      data: newData,
    };
  }

  async findAll() {
    const allData = await this.languageRepository.find({
      relations: ['releation'],
    });
    return allData;
  }

  async findOne(id: number) {
    const oneData = await this.languageRepository.findOne({
      where: { id },
      relations: ['releation'],
    });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    return oneData;
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    const oneData = await this.languageRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    await this.languageRepository.update(id, updateLanguageDto);
    return {
      message: 'updated',
      id: oneData.id,
    };
  }

  async remove(id: number) {
    const data = await this.languageRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Data is not found!');
    }
    await this.languageRepository.delete(id);

    return {
      message: 'deleted',
      id: data.id,
    };
  }
}
