import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ example: 'Uzbekistan, Tashkent' })
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({ example: 'Tashkent' })
  @IsNotEmpty()
  readonly city: string;

  @ApiProperty({ example: 'dd4665' })
  @IsNotEmpty()
  readonly postcode: string;

  @ApiProperty({ example: '+998995554411' })
  @IsPhoneNumber()
  readonly phone: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123456' })
  @IsStrongPassword()
  readonly password: string;

  @ApiProperty({ example: 'Lorem ipsum dolor ...' })
  @IsOptional()
  readonly about_text: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  readonly role_id: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  readonly is_active: boolean;
}
