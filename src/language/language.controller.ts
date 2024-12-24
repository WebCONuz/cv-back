import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Language } from './entities/language.entity';

@ApiTags('language')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiOperation({ summary: 'Created language' })
  @ApiResponse({ status: 201, description: 'Created language', type: Language })
  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languageService.create(createLanguageDto);
  }

  @ApiOperation({ summary: 'All languages' })
  @ApiResponse({ status: 200, description: 'All languages', type: [Language] })
  @Get()
  findAll() {
    return this.languageService.findAll();
  }

  @ApiOperation({ summary: 'One language by id' })
  @ApiResponse({ status: 200, description: 'One language', type: Language })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languageService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edit language' })
  @ApiResponse({ status: 200, description: 'Edit language', type: Language })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languageService.update(+id, updateLanguageDto);
  }

  @ApiOperation({ summary: 'Delete language' })
  @ApiResponse({ status: 200, description: 'Delete language', type: Language })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languageService.remove(+id);
  }
}
