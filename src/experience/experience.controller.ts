import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Experience } from './entities/experience.entity';

@ApiTags('experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @ApiOperation({ summary: 'Created experience' })
  @ApiResponse({
    status: 201,
    description: 'Created experience',
    type: Experience,
  })
  @Post()
  create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experienceService.create(createExperienceDto);
  }

  @ApiOperation({ summary: 'All experiences' })
  @ApiResponse({
    status: 200,
    description: 'All experiences',
    type: [Experience],
  })
  @Get()
  findAll() {
    return this.experienceService.findAll();
  }

  @ApiOperation({ summary: 'One experience by id' })
  @ApiResponse({ status: 200, description: 'One experience', type: Experience })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experienceService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edit experience' })
  @ApiResponse({
    status: 200,
    description: 'Edit experience',
    type: Experience,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experienceService.update(+id, updateExperienceDto);
  }

  @ApiOperation({ summary: 'Delete experience' })
  @ApiResponse({
    status: 200,
    description: 'Delete experience',
    type: Experience,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienceService.remove(+id);
  }
}
