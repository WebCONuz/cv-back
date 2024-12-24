import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Language {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'English' })
  @Column()
  language: string;

  @ApiProperty({ example: 'Intermediate' })
  @Column()
  degree: string;

  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  releation_id: number;

  @ApiProperty({ example: true })
  @Column({ default: true })
  is_active: boolean;
}
