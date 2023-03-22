import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAnswerDto } from './create-answer.dto';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  readonly  title: string;

  @ApiProperty({
    type: CreateAnswerDto,
    isArray: true,
  })
  readonly answers: Array<CreateAnswerDto>;
}
