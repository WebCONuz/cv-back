import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUsermessageDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '+998995554411' })
  @IsPhoneNumber()
  readonly phone: string;

  @ApiProperty({ example: 'Xizmatlar' })
  @IsNotEmpty()
  readonly subject: string;

  @ApiProperty({ example: 'Yuklab olish ishlamayapti, qaramaysilarmiee' })
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({ example: 4.5 })
  @IsOptional()
  readonly star: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  readonly is_active: boolean;
}
