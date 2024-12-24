import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ example: 'C++' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'hard' })
  @IsEnum(['hard', 'soft', 'other'])
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  readonly releation_id: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  readonly is_active: boolean;
}
