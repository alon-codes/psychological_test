import { Test, TestingModule } from '@nestjs/testing';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import { AnswerEntity } from './entities/answer.entity';
import { seed_data } from '../seed-data';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { SubmitQuizDto } from './dto/submit-quiz-dto';
import { AppModule } from '../app.module';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('QuizController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

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

  describe('/quiz', () => {
    it('POST creates a new question', async () => {
      const createQuestionDto: CreateQuestionDto = {
        title: 'When you`re at a party, how do you feel?',
        options: [
          { text: 'Energized and excited by the crowd', points: 4 },
          {
            text: 'Slightly energized, but also a bit overwhelmed',
            points: 3,
          },
          { text: 'Neutral', points: 2 },
          {
            text: 'A little drained, but still enjoying yourself',
            points: 1,
          },
          { text: 'Completely drained and exhausted', points: 0 },
        ],
      };

      const response = await request(app.getHttpServer())
        .post('/quiz')
        .send(createQuestionDto)
        .expect(201);

      expect(response.body.title).toBe(createQuestionDto.title);
      expect(response.body.options.length).toBe(
        createQuestionDto.options.length,
      );
    });

    it('GET retrieves all questions', async () => {
      const response = await request(app.getHttpServer())
        .get('/quiz')
        .expect(200);

      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
