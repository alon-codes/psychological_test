import { Controller, Get, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { SubmitQuizDto } from './dto/submit-quiz-dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly questionService: QuizService) { }


  @Get()
  async findAll() {
    return await this.questionService.findAll();
  }

  @Post('submit')
  async submitQuiz(@Body() submitQuizDto: SubmitQuizDto) {
    let score = 0;
    let quizTotalSum = 0;

    if (!!submitQuizDto.replies) {
      for (const currentReply of submitQuizDto.replies) {
        const currentAnswer = await this.questionService.getAnswer(
          currentReply.selected_answer_id,
        );
        const currentQuestion = await this.questionService.getQuestionById(
          currentReply.question_id,
        );
        if (!currentAnswer || !currentQuestion) {
          continue;
        }
        score += currentAnswer.points;
        console.log({ currentAnswer });
        quizTotalSum += currentQuestion.options.length || 0;
      }
    }

    console.log({ score });

    let desc = 'test';

    const relativeScore = score / quizTotalSum;

    console.log({ relativeScore, quizTotalSum });

    if (relativeScore <= 0.3) {
      desc = 'introverted';
    } else if (relativeScore > 0.3 && relativeScore <= 0.6) {
      desc = 'ambivert';
    } else if (relativeScore > 0.6) {
      desc = 'extroverted';
    }

    return { score: desc, numeric: relativeScore };
  }
}
