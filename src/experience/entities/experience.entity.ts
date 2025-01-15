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
export class Experience {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Epam systems' })
  @Column()
  company_name: string;

  @ApiProperty({ example: 'Uzbekistan, Tashkent' })
  @Column({ nullable: true })
  company_address: string;

  @ApiProperty({ example: 'Frontend Dev' })
  @Column()
  position: string;

  @ApiProperty({ example: 'April, 2023' })
  @Column()
  start_time: string;

  @ApiProperty({ example: 'December, 2024' })
  @Column()
  end_time: string;

  @ApiProperty({ example: 'Lorem ipsum set dolor ...' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  releation_id: number;

  @ApiProperty({ example: true })
  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Releation, (releation) => releation.experiences)
  @JoinColumn({ name: 'releation_id' })
  releation: Releation;
}
