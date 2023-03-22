import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

class Reply {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  readonly question_id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  readonly answer_id: string;
}

export class SubmitQuizDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ isArray: true })
  readonly replies: Array<Reply>;
}
