import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Otp {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1234 })
  @Column()
  otp: number;

  @ApiProperty({ example: 1 })
  @Column()
  user_id: number;

  @ApiProperty({ example: '12 Apr, 2025' })
  @Column({ default: new Date(Date.now() + 2 * 60 * 1000) })
  expires: Date;
}
