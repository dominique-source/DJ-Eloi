'use server';

export interface UnlockState {
  ok: boolean;
  message: string;
}

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Action serveur du formulaire de déverrouillage de la console DJ
 * Academy. Valide puis journalise la demande côté serveur (le
 * branchement vers un outil d'emailing se fait ici plus tard).
 */
export async function submitUnlock(
  _previous: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();

  if (!name || !EMAIL_PATTERN.test(email)) {
    return { ok: false, message: 'Vérifie ton nom complet et ton courriel.' };
  }

  console.log('[dj-academy] console déverrouillée', { name, email });

  return { ok: true, message: 'Console déverrouillée.' };
}
