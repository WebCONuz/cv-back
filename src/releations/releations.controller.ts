import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReleationService } from './releations.service';
import { CreateReleationDto } from './dto/create-releation.dto';
import { UpdateReleationDto } from './dto/update-releation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Releation } from './entities/releation.entity';

@ApiTags('releation')
@Controller('releation')
export class ReleationController {
  constructor(private readonly releationService: ReleationService) {}

  @ApiOperation({ summary: 'Created releation' })
  @ApiResponse({
    status: 201,
    description: 'Created releation',
    type: Releation,
  })
  @Post()
  create(@Body() createReleationDto: CreateReleationDto) {
    return this.releationService.create(createReleationDto);
  }

  @ApiOperation({ summary: 'All releations' })
  @ApiResponse({
    status: 200,
    description: 'All releations',
    type: [Releation],
  })
  @Get()
  findAll() {
    return this.releationService.findAll();
  }

  @ApiOperation({ summary: 'One releation by id' })
  @ApiResponse({ status: 200, description: 'One releation', type: Releation })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.releationService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edit releation' })
  @ApiResponse({ status: 200, description: 'Edit releation', type: Releation })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReleationDto: UpdateReleationDto,
  ) {
    return this.releationService.update(+id, updateReleationDto);
  }

  @ApiOperation({ summary: 'Delete releation' })
  @ApiResponse({
    status: 200,
    description: 'Delete releation',
    type: Releation,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.releationService.remove(+id);
  }
}
