import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({ example: 'english' })
  @IsNotEmpty()
  readonly language: string;

  @ApiProperty({ example: 'Intermediate' })
  @IsEnum([
    'Beginner',
    'Pre-intermediate',
    'Intermediate',
    'Upper-intermediate',
    'Advanced',
    'Mastery',
  ])
  @IsNotEmpty()
  readonly degree: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  readonly releation_id: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  readonly is_active: boolean;
}
