import { getAuth } from 'firebase-admin/auth';
import app from '../server';

const getCookieClaims = async (sessionCookieValue: string) => {
  const auth = getAuth(app);
  const decodedCookie = await auth.verifySessionCookie(sessionCookieValue);

  return decodedCookie;
};

export default getCookieClaims;
