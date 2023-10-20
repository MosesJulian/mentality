import { type DecodedIdToken } from 'firebase-admin/auth';
import { auth } from '../server';

const getCookieClaims = async (sessionCookieValue: string) => {
  const decodedCookie = await auth.verifySessionCookie(sessionCookieValue);

  return (decodedCookie ?? undefined) as DecodedIdToken | undefined;
};

export default getCookieClaims;
