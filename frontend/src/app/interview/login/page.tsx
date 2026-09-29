'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mountain, Link2, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Label } from '@/components/ui/input';

/**
 * Pull the invite token out of whatever the candidate pastes: the full link
 * HR sent, or just the code at its end.
 */
function extractToken(input: string): string | null {
  const text = input.trim();
  const fromLink = text.match(/\/interview\/session\/([A-Za-z0-9_-]{20,100})/);
  if (fromLink) return fromLink[1];
  return /^[A-Za-z0-9_-]{20,100}$/.test(text) ? text : null;
}

export default function CandidateLoginPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = extractToken(code);
    if (!token) {
      setError('Please paste the full interview link that Falcon Trails HR sent you.');
      return;
    }
    router.push(`/interview/session/${token}`);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-950 px-4 py-12 text-ink-100 sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[480px] w-[480px] rounded-full bg-gold-500/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand Crest */}
        <div className="text-center">
          <div className="inline-flex size-14 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/10 text-gold-400 shadow-xl shadow-gold-500/5">
            <Mountain className="size-7" strokeWidth={1.75} />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-ink-50 sm:text-3xl">
            Falcon Trails
          </h1>
          <div className="mt-1 flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gold-400">
            <Sparkles className="size-3.5" />
            AI Interview Portal
          </div>
          <p className="mt-3 text-sm text-ink-400">
            Welcome! Open the interview link HR sent you on WhatsApp or email, or paste it below.
          </p>
        </div>

        {/* Login Box */}
        <div className="mt-8 rounded-2xl border border-ink-800/80 bg-ink-900/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="invite" className="text-xs font-medium text-ink-300">
                Your interview link
              </Label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink-400">
                  <Link2 className="size-4" />
                </div>
                <Input
                  id="invite"
                  type="text"
                  autoComplete="off"
                  required
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="https://falcontrails.in/interview/session/…"
                  className="pl-9 text-base bg-ink-950/60 border-ink-700/60 text-ink-100 placeholder:text-ink-600 focus:border-gold-500 focus:ring-gold-500/20"
                />
              </div>
              <p className="mt-1.5 text-[11.5px] text-ink-500">
                The link works only for you and expires after 7 days. Ask HR for a new one if it stops working.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-loss-500/30 bg-loss-500/10 p-3 text-xs text-loss-400"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={!code.trim()}
              className="w-full bg-gold-500 text-ink-950 hover:bg-gold-400 font-semibold shadow-lg shadow-gold-500/20 h-11"
            >
              Start AI Interview Session
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </form>

          {/* Instructions in very easy English */}
          <div className="mt-6 border-t border-ink-800/80 pt-5">
            <div className="text-[12px] font-medium text-ink-300">What to expect:</div>
            <ul className="mt-2 space-y-1.5 text-[11.5px] text-ink-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-gold-400" />
                <span>5 simple, conversational questions in easy English.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-gold-400" />
                <span>You can speak using your microphone 🎙️ or type your answer ⌨️.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-gold-400" />
                <span>Take your time — there is no rush or trick questions!</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Security & HR Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-ink-500">
          <ShieldCheck className="size-4 text-ink-400" />
          <span>Falcon Trails · Srinagar, Kashmir</span>
        </div>
      </div>
    </div>
  );
}
