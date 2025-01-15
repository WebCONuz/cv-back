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
export class Socialmedia {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Instagram' })
  @Column()
  title: string;

  @ApiProperty({ example: 'https://instagram.com/ff_dev' })
  @Column()
  link: string;

  @ApiProperty({ example: 'ff_dev' })
  @Column()
  account_name: string;

  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  releation_id: number;

  @ApiProperty({ example: true })
  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Releation, (releation) => releation.socialmedias)
  @JoinColumn({ name: 'releation_id' })
  releation: Releation;
}
