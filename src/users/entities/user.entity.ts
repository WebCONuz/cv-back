import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Users {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John' })
  @Column()
  firstname: string;

  @ApiProperty({ example: 'Doe' })
  @Column()
  lastname: string;

  @ApiProperty({ example: 'Uzbekistan, Tashkent' })
  @Column()
  address: string;

  @ApiProperty({ example: 'Tashkent' })
  @Column()
  city: string;

  @ApiProperty({ example: 'dd4665' })
  @Column()
  postcode: string;

  @ApiProperty({ example: '+998995554411' })
  @Column({ unique: true })
  phone: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '123456' })
  @Column()
  password: string;

  @ApiProperty({ example: 'Lorem ipsum dolor ...' })
  @Column({ nullable: true })
  about_text: string;

  @ApiProperty({ example: 1 })
  @Column({ default: 1 })
  role_id: number;

  @ApiProperty({ example: true })
  @Column({ default: false })
  is_active: boolean;
}