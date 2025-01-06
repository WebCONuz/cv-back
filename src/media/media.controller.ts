import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Media } from './entities/media.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @ApiOperation({ summary: 'Created media' })
  @ApiResponse({ status: 201, description: 'Created media', type: Media })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createMediaDto: CreateMediaDto, @UploadedFile() file) {
    return this.mediaService.create(createMediaDto, file);
  }

  @ApiOperation({ summary: 'All medias' })
  @ApiResponse({ status: 200, description: 'All medias', type: [Media] })
  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @ApiOperation({ summary: 'Delete media' })
  @ApiResponse({ status: 200, description: 'Delete media', type: Media })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}
