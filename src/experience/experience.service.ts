import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Repository } from 'typeorm';
import { Experience } from './entities/experience.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
  ) {}

  async create(createExperienceDto: CreateExperienceDto) {
    const newData = await this.experienceRepository.save(createExperienceDto);
    return {
      message: 'creaated',
      data: newData,
    };
  }

  async findAll() {
    const allData = await this.experienceRepository.find({
      relations: ['releation'],
    });
    return allData;
  }

  async findOne(id: number) {
    const oneData = await this.experienceRepository.findOne({
      where: { id },
      relations: ['releation'],
    });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    return oneData;
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    const oneData = await this.experienceRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    await this.experienceRepository.update(id, updateExperienceDto);
    return {
      message: 'updated',
      id: oneData.id,
    };
  }

  async remove(id: number) {
    const data = await this.experienceRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Data is not found!');
    }
    await this.experienceRepository.delete(id);

    return {
      message: 'deleted',
      id: data.id,
    };
  }
}
