import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateSocialmediaDto {
  @ApiProperty({ example: 'Instagram' })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ example: 'https://instagram.com/ff_dev' })
  @IsNotEmpty()
  readonly link: string;

  @ApiProperty({ example: 'ff_dev' })
  @IsNotEmpty()
  readonly account_name: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  readonly releation_id: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  readonly is_active: boolean;
}
