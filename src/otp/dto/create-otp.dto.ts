import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOtpDto {
  @ApiProperty({ example: 1234 })
  @IsNotEmpty()
  readonly otp: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  readonly user_id: number;
}
