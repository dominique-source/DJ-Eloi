'use client';

import { useActionState } from 'react';
import { submitContact, type ContactState } from '@/app/actions/contact';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { profile } from '@/data/profile';
import { siteCopy } from '@/data/site';

const initialState: ContactState = { ok: false, message: '' };

const fieldClass =
  'w-full border-b border-[#0a0a0a]/30 bg-transparent py-3 text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#0a0a0a] focus:outline-none';

/** CTA plein écran accent lime + formulaire branché sur l'action serveur. */
export function ContactCTA() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  return (
    <section id="contact" className="bg-accent px-8 py-24 text-[#0a0a0a] md:px-16">
      <p className="text-xs uppercase tracking-caps text-[#0a0a0a]/60">
        {siteCopy.contact.label}
      </p>
      <h2 className="mt-4 font-display text-5xl font-black italic tracking-title md:text-8xl">
        {siteCopy.contact.title}
      </h2>
      <p className="mt-4 max-w-md text-[#0a0a0a]/70">{siteCopy.contact.subtitle}</p>

      <form action={formAction} className="mt-14 grid max-w-2xl gap-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="text-xs uppercase tracking-caps text-[#0a0a0a]/60">
              {siteCopy.contact.fields.name}
            </label>
            <input id="contact-name" name="name" required className={fieldClass} />
          </div>
          <div>
            <label htmlFor="contact-email" className="text-xs uppercase tracking-caps text-[#0a0a0a]/60">
              {siteCopy.contact.fields.email}
            </label>
            <input id="contact-email" name="email" type="email" required className={fieldClass} />
          </div>
        </div>

        <div>
          <label htmlFor="contact-service" className="text-xs uppercase tracking-caps text-[#0a0a0a]/60">
            {siteCopy.contact.fields.service}
          </label>
          <select id="contact-service" name="service" className={fieldClass}>
            {profile.services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name} · {service.priceRange}
              </option>
            ))}
            <option value="autre">{siteCopy.contact.fields.serviceOther}</option>
          </select>
        </div>

        <div>
          <label htmlFor="contact-message" className="text-xs uppercase tracking-caps text-[#0a0a0a]/60">
            {siteCopy.contact.fields.message}
          </label>
          <textarea id="contact-message" name="message" rows={4} required className={fieldClass} />
        </div>

        <MagneticButton
          type="submit"
          disabled={pending}
          className="w-fit bg-[#0a0a0a] px-10 py-4 text-sm uppercase tracking-caps text-[#f5f5f5] disabled:opacity-60"
        >
          {pending ? siteCopy.contact.sending : siteCopy.contact.submit}
        </MagneticButton>

        {state.message ? (
          <p role="status" className="text-sm font-medium">
            {state.message}
          </p>
        ) : null}
      </form>
    </section>
  );
}
