import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../users/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';

@Entity()
export class Releation {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1 })
  @Column()
  user_id: number;

  @ApiProperty({ example: true })
  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Users, (users) => users.releations, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(() => Skill, (skill) => skill.releation) // Establish one-to-many relationship
  skills: Skill[];
}
