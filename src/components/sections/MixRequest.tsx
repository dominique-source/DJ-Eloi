'use client';

import { useActionState, useState } from 'react';
import { submitMixRequest, type MixRequestState } from '@/app/actions/mixRequest';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SignatureFader } from '@/components/ui/SignatureFader';
import { siteCopy } from '@/data/site';

const initialState: MixRequestState = { ok: false, message: '' };

const fieldClass =
  'w-full border-b border-foreground/25 bg-transparent py-2.5 text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none';

type Mode = 'mix' | 'defi';

/** Demande spéciale : fusionner deux chansons, ou défier DJ King E. */
export function MixRequest() {
  const [mode, setMode] = useState<Mode>('mix');
  const [state, formAction, pending] = useActionState(submitMixRequest, initialState);
  const copy = siteCopy.mixRequest;

  return (
    <section className="border-y border-foreground/10 px-8 py-24 md:px-16">
      <p className="text-xs uppercase tracking-caps text-muted">{copy.label}</p>
      <h2 className="mt-4 font-display text-4xl font-black italic tracking-title md:text-6xl">
        {copy.title}
      </h2>
      <p className="mt-4 max-w-md text-muted">{copy.subtitle}</p>

      <div role="group" aria-label={copy.label} className="mt-10 flex gap-2">
        {(['mix', 'defi'] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-caps transition-colors ${
              mode === m
                ? 'border-accent bg-accent text-[#0a0a0a]'
                : 'border-foreground/20 text-muted hover:border-foreground/50 hover:text-foreground'
            }`}
          >
            {m === 'mix' ? copy.modeMix : copy.modeDefi}
          </button>
        ))}
      </div>

      <form action={formAction} className="mt-8 grid max-w-2xl gap-8">
        <input type="hidden" name="mode" value={mode} />

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <label htmlFor="mix-name" className="text-xs uppercase tracking-caps text-muted">
              {copy.fields.name}
            </label>
            <input id="mix-name" name="name" required className={fieldClass} />
          </div>
          <div>
            <label htmlFor="mix-email" className="text-xs uppercase tracking-caps text-muted">
              {copy.fields.email}
            </label>
            <input id="mix-email" name="email" type="email" required className={fieldClass} />
          </div>
        </div>

        {mode === 'mix' ? (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label htmlFor="mix-song1" className="text-xs uppercase tracking-caps text-muted">
                {copy.fields.song1}
              </label>
              <input id="mix-song1" name="song1" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="mix-song2" className="text-xs uppercase tracking-caps text-muted">
                {copy.fields.song2}
              </label>
              <input id="mix-song2" name="song2" required className={fieldClass} />
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="mix-challenge" className="text-xs uppercase tracking-caps text-muted">
              {copy.fields.challenge}
            </label>
            <textarea
              id="mix-challenge"
              name="challenge"
              rows={3}
              required
              className={fieldClass}
            />
          </div>
        )}

        <MagneticButton
          type="submit"
          disabled={pending}
          className="w-fit border-2 border-accent px-8 py-3 text-sm uppercase tracking-caps text-accent transition-colors hover:bg-accent hover:text-[#0a0a0a] disabled:opacity-60"
        >
          {pending ? copy.sending : copy.submit}
        </MagneticButton>

        {state.message ? (
          <p role="status" className="text-sm text-muted">
            {state.message}
          </p>
        ) : null}
      </form>

      <SignatureFader className="mt-10 w-32" />
    </section>
  );
}
