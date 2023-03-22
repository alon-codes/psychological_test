import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from './quiz/entities/question.entity';
import seed_data from './seed-data';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
