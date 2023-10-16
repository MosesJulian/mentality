import type { APIRoute } from 'astro';
import { getAuth } from 'firebase-admin/auth';
import app from '../../../lib/firebase/server';

const DEFAULT_REDIRECT_PATH = '/';

/**
 * @see https://docs.astro.build/en/guides/backend/google-firebase/#adding-authentication-with-firebase
 */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);

  const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!idToken) {
    return new Response('No token found', { status: 401 });
  }

  try {
    await auth.verifyIdToken(idToken);
  } catch (error) {
    return new Response('Invalid token', { status: 401 });
  }

  const fiveDays = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: fiveDays,
  });

  cookies.set('session', sessionCookie, {
    path: '/',
  });

  return redirect(DEFAULT_REDIRECT_PATH);
};
