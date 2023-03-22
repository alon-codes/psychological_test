import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  readonly  text: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly  points: number;
}
