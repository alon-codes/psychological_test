import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { SubmitQuizDto } from './dto/submit-quiz-dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly questionService: QuizService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    try {
      const res = await this.questionService.create(createQuestionDto);
      return res;
    } catch (e) {
      console.log({ e });
    }

    return null;
  }

  @Get()
  async findAll() {
    return await this.questionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.questionService.getQuestionById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }

  @Post('submit')
  async submitQuiz(@Body() submitQuizDto: SubmitQuizDto) {
    let score = 0;
    if (!!submitQuizDto.replies) {
      for (const currentReply of submitQuizDto.replies) {
        const currentAnswer = await this.questionService.getAnswer(
          currentReply.answer_id,
        );
        score += currentAnswer.points;
      }
    }

    let desc;

    if (score > 0 && score <= 4) {
      desc = 'highly_introverted';
    } else if (score >= 5 && score <= 9) {
      desc = 'moderately_introverted';
    } else if (score >= 10 && score <= 14) {
      desc = 'moderately_extraverted';
    } else if (score >= 15 && score <= 19) {
      desc = 'moderately_extraverted';
    }

    return { score: desc };
  }
}
