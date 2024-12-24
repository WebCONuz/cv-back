import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
}
