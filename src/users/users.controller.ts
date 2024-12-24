import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Created users' })
  @ApiResponse({ status: 201, description: 'Created users', type: Users })
  @Post()
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @ApiOperation({ summary: 'All userss' })
  @ApiResponse({ status: 200, description: 'All userss', type: [Users] })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'One users by id' })
  @ApiResponse({ status: 200, description: 'One users', type: Users })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edit users' })
  @ApiResponse({ status: 200, description: 'Edit users', type: Users })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
    return this.usersService.update(+id, updateUsersDto);
  }

  @ApiOperation({ summary: 'Delete users' })
  @ApiResponse({ status: 200, description: 'Delete users', type: Users })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
