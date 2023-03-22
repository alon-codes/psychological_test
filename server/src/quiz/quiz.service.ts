import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import seed_data from 'src/seed-data';
import { Db, Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AnswerEntity } from './entities/answer.entity';
import { QuestionEntity } from './entities/question.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
    @InjectRepository(AnswerEntity)
    private answerRepository: Repository<AnswerEntity>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const brand_answers = await this.answerRepository.save(
      createQuestionDto.answers,
    );
    console.log({ brand_answers });

    const brand_question = new QuestionEntity();

    console.log({ brand_question });

    return await this.questionRepository.save({
      title: createQuestionDto.title,
      options: brand_answers,
    });
  }

  async findAll() {
    return await this.questionRepository.find({
      relations: {
        options: true,
      },
    });
  }

  async getAnswer(id: string) {
    return await this.answerRepository.findOne({
      where: { id },
    });
  }

  async getQuestionById(id: string) {
    return await this.questionRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return await this.questionRepository.update(id, updateQuestionDto);
  }

  async remove(id: number) {
    return await this.questionRepository.delete(id);
  }
}
