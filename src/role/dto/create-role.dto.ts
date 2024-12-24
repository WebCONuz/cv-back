import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'user' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  readonly is_active: boolean;
}
