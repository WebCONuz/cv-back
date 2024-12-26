import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OtpService {
  constructor(@InjectRepository(Otp) private otpRepository: Repository<Otp>) {}

  async create(createOtpDto: CreateOtpDto) {
    const newData = await this.otpRepository.save(createOtpDto);
    return {
      message: 'creaated',
      data: newData,
    };
  }

  async findAll() {
    const allData = await this.otpRepository.find();
    return allData;
  }

  async findOne(id: number) {
    const oneData = await this.otpRepository.findOneBy({ user_id: id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    return oneData;
  }

  async update(id: number, updateOtpDto: UpdateOtpDto) {
    const oneData = await this.otpRepository.findOneBy({ id });
    if (!oneData) {
      throw new NotFoundException('Data is not found!');
    }
    await this.otpRepository.update(id, updateOtpDto);
    return {
      message: 'updated',
      id: oneData.id,
    };
  }

  async remove(id: number) {
    const data = await this.otpRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException('Data is not found!');
    }
    await this.otpRepository.delete(id);

    return {
      message: 'deleted',
      id: data.id,
    };
  }
}
