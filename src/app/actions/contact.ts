'use server';

import { siteCopy } from '@/data/site';

export interface ContactState {
  ok: boolean;
  message: string;
}

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Action serveur du formulaire de contact. Valide puis journalise la
 * demande côté serveur (le branchement courriel — ex. Resend — se fait
 * ici quand l'adresse réelle sera connue dans profile.ts).
 */
export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const service = String(formData.get('service') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !EMAIL_PATTERN.test(email) || !message) {
    return { ok: false, message: siteCopy.contact.error };
  }

  console.log('[contact] nouvelle demande', {
    name,
    email,
    service,
    messageLength: message.length,
  });

  return { ok: true, message: siteCopy.contact.success };
}
