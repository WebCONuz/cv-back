import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({ example: 'avatar.png' })
  @IsString()
  @IsNotEmpty()
  readonly media_name: string;

  @ApiProperty({
    example: 'user',
    description: 'For which table the file is used',
  })
  @IsString()
  @IsNotEmpty()
  readonly table_name: string;

  @ApiProperty({ example: 1, description: 'Table ID' })
  @IsNumber()
  @IsNotEmpty()
  readonly table_id: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  readonly is_active: boolean;
}
