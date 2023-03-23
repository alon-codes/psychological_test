import { Test, TestingModule } from '@nestjs/testing';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import { AnswerEntity } from './entities/answer.entity';
import seed_data from '../seed-data';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { SubmitQuizDto } from './dto/submit-quiz-dto';

describe('QuizController', () => {
  let controller: QuizController;
  let service: QuizService;

  const questionRepositoryMock = {
    save: jest.fn().mockResolvedValue(seed_data),
    find: jest.fn().mockResolvedValue(seed_data),
    findOne: jest.fn().mockResolvedValue(seed_data[0]),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };

  const answerRepositoryMock = {
    save: jest.fn().mockImplementation((answers) => {
      const createdAnswers = answers.map((answer) => {
        const createdAnswer = new AnswerEntity();
        createdAnswer.id = answer.id;
        createdAnswer.text = answer.text;
        createdAnswer.points = answer.points;
        return createdAnswer;
      });
      return Promise.resolve(createdAnswers);
    }),
    findOne: jest.fn().mockResolvedValue(seed_data[0].options[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizController],
      providers: [
        QuizService,
        {
          provide: getRepositoryToken(QuestionEntity),
          useValue: questionRepositoryMock,
        },
        {
          provide: getRepositoryToken(AnswerEntity),
          useValue: answerRepositoryMock,
        },
      ],
    }).compile();

    controller = module.get<QuizController>(QuizController);
    service = module.get<QuizService>(QuizService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
