import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Media {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'avatar.png' })
  @Column()
  media_name: string;

  @ApiProperty({
    example: 'user',
    description: 'For which table the file is used',
  })
  @Column()
  table_name: string;

  @ApiProperty({ example: 1, description: 'Table ID' })
  @Column()
  table_id: number;

  @ApiProperty({ example: true })
  @Column({ default: true })
  is_active: boolean;
}
