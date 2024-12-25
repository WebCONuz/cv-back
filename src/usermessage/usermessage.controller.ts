import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsermessageService } from './usermessage.service';
import { CreateUsermessageDto } from './dto/create-usermessage.dto';
import { UpdateUsermessageDto } from './dto/update-usermessage.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Usermessage } from './entities/usermessage.entity';

@ApiTags('usermessage')
@Controller('usermessage')
export class UsermessageController {
  constructor(private readonly usermessageService: UsermessageService) {}

  @ApiOperation({ summary: 'Created usermessage' })
  @ApiResponse({
    status: 201,
    description: 'Created usermessage',
    type: Usermessage,
  })
  @Post()
  create(@Body() createUsermessageDto: CreateUsermessageDto) {
    return this.usermessageService.create(createUsermessageDto);
  }

  @ApiOperation({ summary: 'All usermessages' })
  @ApiResponse({
    status: 200,
    description: 'All usermessages',
    type: [Usermessage],
  })
  @Get()
  findAll() {
    return this.usermessageService.findAll();
  }

  @ApiOperation({ summary: 'One usermessage by id' })
  @ApiResponse({
    status: 200,
    description: 'One usermessage',
    type: Usermessage,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usermessageService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edit usermessage' })
  @ApiResponse({
    status: 200,
    description: 'Edit usermessage',
    type: Usermessage,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsermessageDto: UpdateUsermessageDto,
  ) {
    return this.usermessageService.update(+id, updateUsermessageDto);
  }

  @ApiOperation({ summary: 'Delete usermessage' })
  @ApiResponse({
    status: 200,
    description: 'Delete usermessage',
    type: Usermessage,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usermessageService.remove(+id);
  }
}
