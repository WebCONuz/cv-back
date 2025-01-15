import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
  ) {}

  async create(createEducationDto: CreateEducationDto) {
    const newData = await this.educationRepository.save(createEducationDto);
    return {
      message: 'creaated',
      data: newData,
    };
  }

  async findAll() {
    const allData = await this.educationRepository.find({
      relations: ['releation'],
    });
    return allData;
  }

  async findOne(id: number) {
    const oneData = await this.educationRepository.findOne({
      where: { id },
      relations: ['releation'],
    });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    return oneData;
  }

  async update(id: number, updateEducationDto: UpdateEducationDto) {
    const oneData = await this.educationRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    await this.educationRepository.update(id, updateEducationDto);
    return {
      message: 'updated',
      id: oneData.id,
    };
  }

  async remove(id: number) {
    const data = await this.educationRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Data is not found!');
    }
    await this.educationRepository.delete(id);

    return {
      message: 'deleted',
      id: data.id,
    };
  }
}
