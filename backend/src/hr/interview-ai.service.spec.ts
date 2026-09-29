import { ConfigService } from '@nestjs/config';
import { InterviewOutcome } from '@prisma/client';
import { InterviewAiService } from './interview-ai.service';

const QUESTIONS = [
  { question: 'Q1' },
  { question: 'Q2' },
];

function makeInterview(overrides: Record<string, unknown> = {}) {
  return {
    id: 'iv-1',
    candidateName: 'Asha',
    candidatePhone: '+91 98765 43210',
    role: 'Sales Executive',
    scheduledAt: new Date('2026-09-30T10:00:00Z'),
    durationMinutes: 45,
    questionnaire: QUESTIONS.map((q) => ({ ...q })),
    overallRating: 4,
    strengths: 'secret strengths',
    concerns: 'secret concerns',
    outcome: InterviewOutcome.PENDING,
    outcomeNote: 'secret note',
    ...overrides,
  };
}

describe('InterviewAiService candidate access', () => {
  let prisma: any;
  let service: InterviewAiService;

  beforeEach(() => {
    prisma = {
      interview: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(({ data }) => Promise.resolve({ ...makeInterview(), ...data })),
      },
      // No AI provider configured: every AI call falls back.
      integration: { findMany: jest.fn().mockResolvedValue([]) },
    };
    const config = { get: (k: string) => (k === 'JWT_SECRET' ? 'test-secret' : undefined) };
    service = new InterviewAiService(prisma, config as unknown as ConfigService);
  });

  it('rejects login with the right phone but a wrong access code', async () => {
    prisma.interview.findMany.mockResolvedValue([makeInterview()]);
    const wrong = service.accessCode('iv-1') === '000000' ? '111111' : '000000';
    await expect(service.loginCandidateByPhone('9876543210', wrong)).rejects.toThrow(
      /not correct/,
    );
  });

  it('rejects a phone that only partially matches', async () => {
    prisma.interview.findMany.mockResolvedValue([makeInterview({ candidatePhone: '1198765432100' })]);
    await expect(
      service.loginCandidateByPhone('9876543210', service.accessCode('iv-1')),
    ).rejects.toThrow(/not correct/);
  });

  it('issues a token that opens only its own interview', async () => {
    prisma.interview.findMany.mockResolvedValue([makeInterview()]);
    const res = await service.loginCandidateByPhone('98765-43210', service.accessCode('iv-1'));
    expect(res.interviewId).toBe('iv-1');
    await expect(service.verifyCandidateToken(res.token, 'iv-1')).resolves.toBeUndefined();
    await expect(service.verifyCandidateToken(res.token, 'iv-2')).rejects.toThrow();
    await expect(service.verifyCandidateToken(undefined, 'iv-1')).rejects.toThrow();
  });

  it('candidate session hides phone, rating and HR/AI verdict', async () => {
    prisma.interview.findUnique.mockResolvedValue(makeInterview());
    const s: any = await service.candidateSession('iv-1');
    for (const key of ['candidatePhone', 'overallRating', 'outcome', 'strengths', 'concerns', 'outcomeNote']) {
      expect(s).not.toHaveProperty(key);
    }
    expect(s.totalQuestions).toBe(2);
  });

  it('candidate must answer in order', async () => {
    prisma.interview.findUnique.mockResolvedValue(makeInterview());
    await expect(service.submitAnswer('iv-1', 1, 'hello', { candidate: true })).rejects.toThrow(
      /current question/,
    );
  });

  it('candidate cannot change answers once the interview is complete', async () => {
    prisma.interview.findUnique.mockResolvedValue(
      makeInterview({ questionnaire: QUESTIONS.map((q) => ({ ...q, answer: 'done' })) }),
    );
    await expect(service.submitAnswer('iv-1', 0, 'new', { candidate: true })).rejects.toThrow(
      /already complete/,
    );
  });

  it('rejects empty, oversized and malformed answers', async () => {
    prisma.interview.findUnique.mockResolvedValue(makeInterview());
    await expect(service.submitAnswer('iv-1', 0, '   ', { candidate: true })).rejects.toThrow();
    await expect(service.submitAnswer('iv-1', 0, 'x'.repeat(3001), { candidate: true })).rejects.toThrow();
    await expect(service.submitAnswer('iv-1', '0' as any, 'ok', { candidate: true })).rejects.toThrow();
    await expect(service.submitAnswer('iv-1', 0, undefined, { candidate: true })).rejects.toThrow();
  });

  it('never sets the hiring outcome or invents a score when AI is unavailable', async () => {
    prisma.interview.findUnique.mockResolvedValue(
      makeInterview({ questionnaire: [{ question: 'Q1', answer: 'a' }, { question: 'Q2' }] }),
    );
    const res: any = await service.submitAnswer('iv-1', 1, 'final answer', { candidate: true });
    expect(res.isCompleted).toBe(true);
    expect(res).not.toHaveProperty('evaluation');
    const data = prisma.interview.update.mock.calls[0][0].data;
    expect(data).not.toHaveProperty('outcome');
    expect(data).not.toHaveProperty('overallRating');
    expect(data.outcomeNote).toMatch(/AI evaluation unavailable/);
  });

  it('records an AI verdict only as a recommendation', () => {
    const update: any = service.evaluationUpdate({
      overallRating: 5,
      percentageScore: 95,
      communicationLevel: 'Fluent',
      strengths: 's',
      concerns: 'c',
      outcome: InterviewOutcome.SELECTED,
      outcomeNote: 'great',
    });
    expect(update).not.toHaveProperty('outcome');
    expect(update.outcomeNote).toMatch(/^AI recommendation: SELECTED/);
    expect(update.outcomeNote).toMatch(/HR must confirm/);
  });
});
