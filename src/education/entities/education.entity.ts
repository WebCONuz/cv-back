import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Education {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'TATU' })
  @Column()
  title: string;

  @ApiProperty({ example: 'April, 2023' })
  @Column()
  start_time: string;

  @ApiProperty({ example: 'December, 2024' })
  @Column()
  end_time: string;

  @ApiProperty({ example: 'Bachelor' })
  @Column()
  position: string;

  @ApiProperty({ example: 'Computer Engineering' })
  @Column()
  faculty: string;

  @ApiProperty({ example: 'Lorem ipsum set dolor ...' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  releation_id: number;

  @ApiProperty({ example: true })
  @Column({ default: true })
  is_active: boolean;
}
