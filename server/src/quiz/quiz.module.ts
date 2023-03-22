import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import { AnswerEntity } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity, AnswerEntity])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
