import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user' })
  @Column()
  name: string;

  @ApiProperty({ example: true })
  @Column({ default: true })
  is_active: boolean;
}
