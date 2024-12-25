import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Media } from './entities/media.entity';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @ApiOperation({ summary: 'Created media' })
  @ApiResponse({ status: 201, description: 'Created media', type: Media })
  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @ApiOperation({ summary: 'All medias' })
  @ApiResponse({ status: 200, description: 'All medias', type: [Media] })
  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @ApiOperation({ summary: 'One media by id' })
  @ApiResponse({ status: 200, description: 'One media', type: Media })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edit media' })
  @ApiResponse({ status: 200, description: 'Edit media', type: Media })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(+id, updateMediaDto);
  }

  @ApiOperation({ summary: 'Delete media' })
  @ApiResponse({ status: 200, description: 'Delete media', type: Media })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}
