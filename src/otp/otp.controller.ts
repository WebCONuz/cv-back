import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Otp } from './entities/otp.entity';

@ApiTags('otp')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @ApiOperation({ summary: 'Created otp' })
  @ApiResponse({ status: 201, description: 'Created otp', type: Otp })
  @Post()
  create(@Body() createOtpDto: CreateOtpDto) {
    return this.otpService.create(createOtpDto);
  }

  @ApiOperation({ summary: 'All otps' })
  @ApiResponse({ status: 200, description: 'All otps', type: [Otp] })
  @Get()
  findAll() {
    return this.otpService.findAll();
  }

  @ApiOperation({ summary: 'One otp by id' })
  @ApiResponse({ status: 200, description: 'One otp', type: Otp })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otpService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edit otp' })
  @ApiResponse({ status: 200, description: 'Edit otp', type: Otp })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOtpDto: UpdateOtpDto) {
    return this.otpService.update(+id, updateOtpDto);
  }

  @ApiOperation({ summary: 'Delete otp' })
  @ApiResponse({ status: 200, description: 'Delete otp', type: Otp })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otpService.remove(+id);
  }
}
