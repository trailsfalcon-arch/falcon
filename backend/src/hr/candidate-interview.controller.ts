import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Public } from '../common/decorators/public.decorator';
import { InterviewAiService } from './interview-ai.service';

/**
 * Candidate-facing AI interview. Public to the staff JWT guard, but every
 * session route needs the scoped token issued by `login`, and that token only
 * opens the one interview it was issued for.
 */
@Public()
@Controller('interviews/candidate')
export class CandidateInterviewController {
  constructor(private readonly aiService: InterviewAiService) {}

  /** Mobile number + six-digit access code from HR -> candidate token. */
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  login(@Body() body: { phone?: unknown; code?: unknown }) {
    return this.aiService.loginCandidateByPhone(body?.phone, body?.code);
  }

  @Get(':id/session')
  async getSession(
    @Param('id') id: string,
    @Headers('x-candidate-token') token?: string,
  ) {
    await this.aiService.verifyCandidateToken(token, id);
    return this.aiService.candidateSession(id);
  }

  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Post(':id/answer')
  async submitAnswer(
    @Param('id') id: string,
    @Headers('x-candidate-token') token: string | undefined,
    @Body() body: { questionIndex?: unknown; answer?: unknown },
  ) {
    await this.aiService.verifyCandidateToken(token, id);
    return this.aiService.submitAnswer(id, body?.questionIndex, body?.answer, {
      candidate: true,
    });
  }
}
