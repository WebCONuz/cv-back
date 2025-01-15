import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { MediaService } from '../media/media.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly mediaService: MediaService,
  ) {}

  async create(createUsersDto: CreateUsersDto) {
    const newData = await this.usersRepository.save(createUsersDto);
    return newData;
  }

  async findAll() {
    const allData = await this.usersRepository.find({
      relations: ['releations', 'role'],
      select: {
        id: true,
        firstname: true,
        lastname: true,
        address: true,
        city: true,
        postcode: true,
        phone: true,
        email: true,
        about_text: true,
        releations: { id: true, is_active: true },
      },
    });

    const fullData = [];
    for (let item of allData) {
      const medias = await this.mediaService.findByName(item.id, 'users');
      fullData.push({
        ...item,
        medias,
      });
    }
    return fullData;
  }

  async findOne(id: number) {
    const oneData = await this.usersRepository.findOne({
      where: { id },
      relations: ['releations', 'role'],
    });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    return oneData;
  }

  async findByEmail(email: string) {
    const oneData = await this.usersRepository.findOneBy({ email });
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

  async saveToken(
    id: number,
    updateUsersDto: { refresh_token: string; is_active?: boolean },
  ) {
    const oneData = await this.usersRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    await this.usersRepository.update(id, updateUsersDto);
    return true;
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
