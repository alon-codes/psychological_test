import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';

export enum Values {
  Extraverted = 1,
  Intraverted = -1,
  Ambivert = 0,
}

@Entity()
export class AnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  points: number;

  @ManyToOne((t) => QuestionEntity, (t) => t.id, { nullable: true })
  @JoinColumn({ name: 'options' })
  question?: QuestionEntity;
}
