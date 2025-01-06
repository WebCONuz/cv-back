import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({
    example: 'user',
    description: 'For which table the file is used',
  })
  @IsString()
  @IsNotEmpty()
  readonly table_name: string;

  @ApiProperty({ example: 1, description: 'Table ID' })
  @IsNotEmpty()
  readonly table_id: string;
}
