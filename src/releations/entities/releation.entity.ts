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
import { Education } from '../../education/entities/education.entity';
import { Experience } from '../../experience/entities/experience.entity';
import { Language } from '../../language/entities/language.entity';
import { Socialmedia } from '../../socialmedia/entities/socialmedia.entity';

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

  @OneToMany(() => Education, (education) => education.releation) // Establish one-to-many relationship
  educations: Education[];

  @OneToMany(() => Experience, (experience) => experience.releation) // Establish one-to-many relationship
  experiences: Experience[];

  @OneToMany(() => Language, (language) => language.releation) // Establish one-to-many relationship
  languages: Language[];

  @OneToMany(() => Socialmedia, (socialmedia) => socialmedia.releation) // Establish one-to-many relationship
  socialmedias: Socialmedia[];
}
