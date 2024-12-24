import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Skill } from './entities/skill.entity';

@ApiTags('skill')
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @ApiOperation({ summary: 'Created skill' })
  @ApiResponse({ status: 201, description: 'Created skill', type: Skill })
  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillService.create(createSkillDto);
  }

  @ApiOperation({ summary: 'All skills' })
  @ApiResponse({ status: 200, description: 'All skills', type: [Skill] })
  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @ApiOperation({ summary: 'One skill by id' })
  @ApiResponse({ status: 200, description: 'One skill', type: Skill })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edit skill' })
  @ApiResponse({ status: 200, description: 'Edit skill', type: Skill })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillService.update(+id, updateSkillDto);
  }

  @ApiOperation({ summary: 'Delete skill' })
  @ApiResponse({ status: 200, description: 'Delete skill', type: Skill })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillService.remove(+id);
  }
}
