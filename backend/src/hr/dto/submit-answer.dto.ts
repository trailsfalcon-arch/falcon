import { IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { MAX_ANSWER_CHARS } from '../interview-ai.service';

export class SubmitAnswerDto {
  @IsInt() @Min(0) @Max(49)
  questionIndex!: number;

  @IsString() @MinLength(1) @MaxLength(MAX_ANSWER_CHARS)
  answer!: string;
}
