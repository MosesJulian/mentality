import type { APIRoute } from 'astro';

const DEFAULT_REDIRECT_PATH = '/auth/signin';

export const POST: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete('session', {
    path: '/',
  });

  return redirect(DEFAULT_REDIRECT_PATH);
};
