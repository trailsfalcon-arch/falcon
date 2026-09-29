import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Public } from '../common/decorators/public.decorator';
import { InterviewAiService } from './interview-ai.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

/**
 * Candidate-facing AI interview. Public, but every route needs the invite
 * token from the link HR sends (staff issue it from the interview screen).
 * The token is unguessable, expires, and can be rotated; there is no lookup
 * by phone number or interview id. Responses never include the candidate's
 * phone or the AI's evaluation.
 */
@Public()
@Throttle({ default: { limit: 20, ttl: 60000 } })
@Controller('interviews/candidate')
export class CandidateInterviewController {
  constructor(private readonly aiService: InterviewAiService) {}

  @Get(':token/session')
  getSession(@Param('token') token: string) {
    return this.aiService.candidateSession(token);
  }

  /**
   * Answer the current question. Answers are write-once and sequential; the
   * reply is warm feedback and the next question, never a score.
   */
  @Post(':token/answer')
  submitAnswer(@Param('token') token: string, @Body() body: SubmitAnswerDto) {
    return this.aiService.candidateAnswer(token, body.questionIndex, body.answer);
  }
}
