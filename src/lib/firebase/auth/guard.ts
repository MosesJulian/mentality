import type { AstroGlobal } from 'astro';
import getCookieClaims from './getCookieClaims';
import type { DecodedIdToken } from 'firebase-admin/auth';

const authGuard = async (
  astro: AstroGlobal,
): Promise<[data: Response, ok: false] | [data: DecodedIdToken, ok: true]> => {
  const redirectUrl = `/auth/signin/?redirect=${astro.url.pathname}`;

  const sessionCookie = astro.cookies.get('session')?.value;
  if (sessionCookie === undefined) return [astro.redirect(redirectUrl), false];

  const claims = await getCookieClaims(sessionCookie);
  if (claims === undefined) return [astro.redirect(redirectUrl), false];

  return [claims, true];
};

export default authGuard;
