import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async create(createUsersDto: CreateUsersDto) {
    const newData = await this.usersRepository.save(createUsersDto);
    return {
      message: 'creaated',
      data: newData,
    };
  }

  async findAll() {
    const allData = await this.usersRepository.find();
    return allData;
  }

  async findOne(id: number) {
    const oneData = await this.usersRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    return oneData;
  }

  async update(id: number, updateUsersDto: UpdateUsersDto) {
    const oneData = await this.usersRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    await this.usersRepository.update(id, updateUsersDto);

    return {
      message: 'updated',
      id: oneData.id,
    };
  }

  async remove(id: number) {
    const data = await this.usersRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Data is not found!');
    }
    await this.usersRepository.delete(id);

    return {
      message: 'deleted',
      id: data.id,
    };
  }
}
