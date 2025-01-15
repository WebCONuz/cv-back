import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSocialmediaDto } from './dto/create-socialmedia.dto';
import { UpdateSocialmediaDto } from './dto/update-socialmedia.dto';
import { Repository } from 'typeorm';
import { Socialmedia } from './entities/socialmedia.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SocialmediaService {
  constructor(
    @InjectRepository(Socialmedia)
    private socialmediaRepository: Repository<Socialmedia>,
  ) {}

  async create(createSocialmediaDto: CreateSocialmediaDto) {
    const newData = await this.socialmediaRepository.save(createSocialmediaDto);
    return {
      message: 'creaated',
      data: newData,
    };
  }

  async findAll() {
    const allData = await this.socialmediaRepository.find({
      relations: ['releation'],
    });
    return allData;
  }

  async findOne(id: number) {
    const oneData = await this.socialmediaRepository.findOne({
      where: { id },
      relations: ['releation'],
    });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    return oneData;
  }

  async update(id: number, updateSocialmediaDto: UpdateSocialmediaDto) {
    const oneData = await this.socialmediaRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    await this.socialmediaRepository.update(id, updateSocialmediaDto);
    return {
      message: 'updated',
      id: oneData.id,
    };
  }

  async remove(id: number) {
    const data = await this.socialmediaRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Data is not found!');
    }
    await this.socialmediaRepository.delete(id);

    return {
      message: 'deleted',
      id: data.id,
    };
  }
}
