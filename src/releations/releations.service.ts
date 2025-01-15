import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReleationDto } from './dto/create-releation.dto';
import { UpdateReleationDto } from './dto/update-releation.dto';
import { Repository } from 'typeorm';
import { Releation } from './entities/releation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReleationService {
  constructor(
    @InjectRepository(Releation)
    private releationRepository: Repository<Releation>,
  ) {}

  async create(createReleationDto: CreateReleationDto) {
    const newData = await this.releationRepository.save(createReleationDto);
    return {
      message: 'creaated',
      data: newData,
    };
  }

  async findAll() {
    const allData = await this.releationRepository.find({
      relations: [
        'user',
        'skills',
        'educations',
        'experiences',
        'languages',
        'socialmedias',
      ],
      select: {
        id: true,
        is_active: true,
        user: {
          id: true,
          firstname: true,
          lastname: true,
          phone: true,
          email: true,
          address: true,
        },
        skills: {
          id: true,
          name: true,
          type: true,
          is_active: true,
        },
        educations: {
          id: true,
          title: true,
          start_time: true,
          end_time: true,
          position: true,
          faculty: true,
          description: true,
        },
        experiences: {
          id: true,
          company_name: true,
          company_address: true,
          position: true,
          start_time: true,
          end_time: true,
          description: true,
        },
        languages: {
          id: true,
          language: true,
          degree: true,
        },
        socialmedias: {
          releation_id: false,
          is_active: false,
        },
      },
    });
    return allData;
  }

  async findOne(id: number) {
    const oneData = await this.releationRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    return oneData;
  }

  async update(id: number, updateReleationDto: UpdateReleationDto) {
    const oneData = await this.releationRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    await this.releationRepository.update(id, updateReleationDto);
    return {
      message: 'updated',
      id: oneData.id,
    };
  }

  async remove(id: number) {
    const data = await this.releationRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Data is not found!');
    }
    await this.releationRepository.delete(id);

    return {
      message: 'deleted',
      id: data.id,
    };
  }
}
