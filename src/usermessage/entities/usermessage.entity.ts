import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Usermessage {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John' })
  @Column()
  firstname: string;

  @ApiProperty({ example: 'Doe' })
  @Column()
  lastname: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @Column()
  email: string;

  @ApiProperty({ example: '+998995554411' })
  @Column()
  phone: string;

  @ApiProperty({ example: 'Xizmatlar' })
  @Column()
  subject: string;

  @ApiProperty({ example: 'Yuklab olish ishlamayapti, qaramaysilarmiee' })
  @Column()
  message: string;

  @ApiProperty({ example: 4.5 })
  @Column({ type: 'float', default: 5 })
  star: number;

  @ApiProperty({ example: true })
  @Column({ default: false })
  is_active: boolean;
}
