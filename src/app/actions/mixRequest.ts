'use server';

export interface MixRequestState {
  ok: boolean;
  message: string;
}

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Action serveur de la section demande de mix / défi. Valide puis
 * journalise la demande côté serveur (le branchement vers un outil
 * d'emailing se fait ici plus tard, comme pour contact.ts).
 */
export async function submitMixRequest(
  _previous: MixRequestState,
  formData: FormData,
): Promise<MixRequestState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const mode = String(formData.get('mode') ?? 'mix');
  const song1 = String(formData.get('song1') ?? '').trim();
  const song2 = String(formData.get('song2') ?? '').trim();
  const challenge = String(formData.get('challenge') ?? '').trim();

  if (!name || !EMAIL_PATTERN.test(email)) {
    return { ok: false, message: 'Vérifie ton nom et ton courriel.' };
  }
  if (mode === 'mix' && (!song1 || !song2)) {
    return { ok: false, message: 'Ajoute tes deux chansons préférées.' };
  }
  if (mode === 'defi' && !challenge) {
    return { ok: false, message: 'Décris ton défi.' };
  }

  console.log('[mix-request] nouvelle demande', {
    name,
    email,
    mode,
    song1,
    song2,
    challenge,
  });

  return {
    ok: true,
    message: 'Demande envoyée. DJ King E te répond très vite.',
  };
}
