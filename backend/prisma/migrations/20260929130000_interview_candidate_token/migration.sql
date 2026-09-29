-- Candidate AI interviews: replace phone-number "login" with an expiring,
-- unguessable invite token, and record when the answers were locked.
ALTER TABLE "Interview" ADD COLUMN "candidateTokenHash" TEXT;
ALTER TABLE "Interview" ADD COLUMN "candidateTokenEnc" TEXT;
ALTER TABLE "Interview" ADD COLUMN "candidateTokenExpiresAt" TIMESTAMP(3);
ALTER TABLE "Interview" ADD COLUMN "aiCompletedAt" TIMESTAMP(3);

CREATE UNIQUE INDEX "Interview_candidateTokenHash_key" ON "Interview"("candidateTokenHash");
