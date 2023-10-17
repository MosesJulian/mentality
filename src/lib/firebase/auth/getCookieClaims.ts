import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import app from '../server';

const getCookieClaims = async (sessionCookieValue: string) => {
  const auth = getAuth(app);
  const decodedCookie = await auth.verifySessionCookie(sessionCookieValue);

  return (decodedCookie ?? undefined) as DecodedIdToken | undefined;
};

export default getCookieClaims;
