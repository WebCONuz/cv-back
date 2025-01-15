import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Releation } from '../../releations/entities/releation.entity';

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

  @ManyToOne(() => Releation, (releation) => releation.languages)
  @JoinColumn({ name: 'releation_id' })
  releation: Releation;
}
