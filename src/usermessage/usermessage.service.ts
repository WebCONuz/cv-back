import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usermessage } from './entities/usermessage.entity';
import { CreateUsermessageDto } from './dto/create-usermessage.dto';
import { UpdateUsermessageDto } from './dto/update-usermessage.dto';

@Injectable()
export class UsermessageService {
  constructor(
    @InjectRepository(Usermessage)
    private usermessageRepository: Repository<Usermessage>,
  ) {}

  async create(createUsermessageDto: CreateUsermessageDto) {
    const newData = await this.usermessageRepository.save(createUsermessageDto);
    return {
      message: 'creaated',
      data: newData,
    };
  }

  async findAll() {
    const allData = await this.usermessageRepository.find();
    return allData;
  }

  async findOne(id: number) {
    const oneData = await this.usermessageRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    return oneData;
  }

  async update(id: number, updateUsermessageDto: UpdateUsermessageDto) {
    const oneData = await this.usermessageRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    await this.usermessageRepository.update(id, updateUsermessageDto);

    return {
      message: 'updated',
      id: oneData.id,
    };
  }

  async remove(id: number) {
    const data = await this.usermessageRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Data is not found!');
    }
    await this.usermessageRepository.delete(id);

    return {
      message: 'deleted',
      id: data.id,
    };
  }
}
