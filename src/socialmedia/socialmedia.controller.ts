import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SocialmediaService } from './socialmedia.service';
import { CreateSocialmediaDto } from './dto/create-socialmedia.dto';
import { UpdateSocialmediaDto } from './dto/update-socialmedia.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Socialmedia } from './entities/socialmedia.entity';

@ApiTags('socialmedia')
@Controller('socialmedia')
export class SocialmediaController {
  constructor(private readonly socialmediaService: SocialmediaService) {}

  @ApiOperation({ summary: 'Created socialmedia' })
  @ApiResponse({
    status: 201,
    description: 'Created socialmedia',
    type: Socialmedia,
  })
  @Post()
  create(@Body() createSocialmediaDto: CreateSocialmediaDto) {
    return this.socialmediaService.create(createSocialmediaDto);
  }

  @ApiOperation({ summary: 'All socialmedias' })
  @ApiResponse({
    status: 200,
    description: 'All socialmedias',
    type: [Socialmedia],
  })
  @Get()
  findAll() {
    return this.socialmediaService.findAll();
  }

  @ApiOperation({ summary: 'One socialmedia by id' })
  @ApiResponse({
    status: 200,
    description: 'One socialmedia',
    type: Socialmedia,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialmediaService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edit socialmedia' })
  @ApiResponse({
    status: 200,
    description: 'Edit socialmedia',
    type: Socialmedia,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSocialmediaDto: UpdateSocialmediaDto,
  ) {
    return this.socialmediaService.update(+id, updateSocialmediaDto);
  }

  @ApiOperation({ summary: 'Delete socialmedia' })
  @ApiResponse({
    status: 200,
    description: 'Delete socialmedia',
    type: Socialmedia,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialmediaService.remove(+id);
  }
}
