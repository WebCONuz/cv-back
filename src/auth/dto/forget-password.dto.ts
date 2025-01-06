import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgetPasswordDto {
  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  readonly email: string;
}
