import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../users/entities/user.entity';

@Entity()
export class Role {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user' })
  @Column()
  name: string;

  @ApiProperty({ example: true })
  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => Users, (user) => user.role) // Establish one-to-many relationship
  users: Users[];
}
