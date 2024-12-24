import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({ example: 'TATU' })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ example: 'April, 2023' })
  @IsNotEmpty()
  readonly start_time: string;

  @ApiProperty({ example: 'December, 2024' })
  @IsNotEmpty()
  readonly end_time: string;

  @ApiProperty({ example: 'Bachelor' })
  @IsNotEmpty()
  readonly position: string;

  @ApiProperty({ example: 'Computer Engineering' })
  @IsNotEmpty()
  readonly faculty: string;

  @ApiProperty({ example: 'Lorem ipsum set dolor ...' })
  @IsOptional()
  readonly description: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  readonly releation_id: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  readonly is_active: boolean;
}
