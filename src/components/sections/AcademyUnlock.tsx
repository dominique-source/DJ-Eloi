'use client';

import { useActionState, useEffect } from 'react';
import { submitUnlock, type UnlockState } from '@/app/actions/unlock';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { siteCopy } from '@/data/site';

const initialState: UnlockState = { ok: false, message: '' };

const fieldClass =
  'w-full border-b border-foreground/25 bg-transparent py-2.5 text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none';

interface AcademyUnlockProps {
  onSubmitAttempt: () => void;
  onUnlocked: () => void;
}

/** Overlay de déverrouillage : nom + courriel requis pour activer la console. */
export function AcademyUnlock({ onSubmitAttempt, onUnlocked }: AcademyUnlockProps) {
  const [state, formAction, pending] = useActionState(submitUnlock, initialState);
  const copy = siteCopy.academy.unlock;

  useEffect(() => {
    if (state.ok) onUnlocked();
  }, [state.ok, onUnlocked]);

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/35 px-6">
      <form
        action={formAction}
        onSubmit={onSubmitAttempt}
        className="w-full max-w-sm border border-accent/40 bg-background/90 p-8"
      >
        <p className="text-xs uppercase tracking-caps text-accent">{copy.title}</p>
        <p className="mt-2 text-sm text-muted">{copy.subtitle}</p>

        <div className="mt-6 grid gap-5">
          <div>
            <label htmlFor="unlock-name" className="text-[10px] uppercase tracking-caps text-muted">
              {copy.name}
            </label>
            <input id="unlock-name" name="name" required className={fieldClass} />
          </div>
          <div>
            <label htmlFor="unlock-email" className="text-[10px] uppercase tracking-caps text-muted">
              {copy.email}
            </label>
            <input id="unlock-email" name="email" type="email" required className={fieldClass} />
          </div>
        </div>

        <MagneticButton
          type="submit"
          disabled={pending}
          className="mt-7 w-full border-2 border-accent py-3 text-xs uppercase tracking-caps text-accent transition-colors hover:bg-accent hover:text-[#0a0a0a] disabled:opacity-60"
        >
          {pending ? copy.submitting : copy.submit}
        </MagneticButton>

        {!state.ok && state.message ? (
          <p role="status" className="mt-4 text-xs text-muted">
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
