import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Created role' })
  @ApiResponse({ status: 201, description: 'Created role', type: Role })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'All roles' })
  @ApiResponse({ status: 200, description: 'All roles', type: [Role] })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: 'One role by id' })
  @ApiResponse({ status: 200, description: 'One role', type: Role })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edit role' })
  @ApiResponse({ status: 200, description: 'Edit role', type: Role })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @ApiOperation({ summary: 'Delete role' })
  @ApiResponse({ status: 200, description: 'Delete role', type: Role })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
