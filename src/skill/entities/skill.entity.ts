import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Skill {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'C++' })
  @Column()
  name: string;

  @ApiProperty({ example: 'hard' })
  @Column()
  type: string;

  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  releation_id: number;

  @ApiProperty({ example: true })
  @Column({ default: true })
  is_active: boolean;
}
