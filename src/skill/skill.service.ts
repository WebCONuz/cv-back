import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    const newData = await this.skillRepository.save(createSkillDto);
    return {
      message: 'creaated',
      data: newData,
    };
  }

  async findAll() {
    const allData = await this.skillRepository.find();
    return allData;
  }

  async findOne(id: number) {
    const oneData = await this.skillRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    return oneData;
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const oneData = await this.skillRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    await this.skillRepository.update(id, updateSkillDto);
    return {
      message: 'updated',
      id: oneData.id,
    };
  }

  async remove(id: number) {
    const data = await this.skillRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Data is not found!');
    }
    await this.skillRepository.delete(id);

    return {
      message: 'deleted',
      id: data.id,
    };
  }
}
