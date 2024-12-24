import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateExperienceDto {
  @ApiProperty({ example: 'Epam systems' })
  @IsNotEmpty()
  readonly company_name: string;

  @ApiProperty({ example: 'Uzbekistan, Tashkent' })
  @IsOptional()
  readonly company_address: string;

  @ApiProperty({ example: 'Frontend Dev' })
  @IsNotEmpty()
  readonly position: string;

  @ApiProperty({ example: 'April, 2023' })
  @IsNotEmpty()
  readonly start_time: string;

  @ApiProperty({ example: 'December, 2024' })
  @IsNotEmpty()
  readonly end_time: string;

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
