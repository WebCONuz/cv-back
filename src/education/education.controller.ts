import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Education } from './entities/education.entity';

@ApiTags('education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @ApiOperation({ summary: 'Created education' })
  @ApiResponse({
    status: 201,
    description: 'Created education',
    type: Education,
  })
  @Post()
  create(@Body() createEducationDto: CreateEducationDto) {
    return this.educationService.create(createEducationDto);
  }

  @ApiOperation({ summary: 'All educations' })
  @ApiResponse({
    status: 200,
    description: 'All educations',
    type: [Education],
  })
  @Get()
  findAll() {
    return this.educationService.findAll();
  }

  @ApiOperation({ summary: 'One education by id' })
  @ApiResponse({ status: 200, description: 'One education', type: Education })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edit education' })
  @ApiResponse({ status: 200, description: 'Edit education', type: Education })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationService.update(+id, updateEducationDto);
  }

  @ApiOperation({ summary: 'Delete education' })
  @ApiResponse({
    status: 200,
    description: 'Delete education',
    type: Education,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationService.remove(+id);
  }
}
