import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const newData = await this.roleRepository.save(createRoleDto);
    return {
      message: 'creaated',
      data: newData,
    };
  }

  async findAll() {
    const allData = await this.roleRepository.find();
    return allData;
  }

  async findOne(id: number) {
    const oneData = await this.roleRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    return oneData;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const oneData = await this.roleRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    await this.roleRepository.update(id, updateRoleDto);
    return {
      message: 'updated',
      id: oneData.id,
    };
  }

  async remove(id: number) {
    const data = await this.roleRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Data is not found!');
    }
    await this.roleRepository.delete(id);

    return {
      message: 'deleted',
      id: data.id,
    };
  }
}
