import { Show, createSignal, onMount } from 'solid-js';
import { auth, collections, googleProvider } from '../../lib/firebase/client';
import { browserSessionPersistence, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import PrimaryButton from './shared/PrimaryButton';

const LoginForm = () => {
  const [isLoading, setLoading] = createSignal(false);

  onMount(async () => {
    await auth.setPersistence(browserSessionPersistence);
  });

  const handleLogin = async () => {
    setLoading(true);

    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      if (user.email === null) return;

      const [response] = await Promise.all([
        new Promise<Response>(async (resolve) => {
          const idToken = await user.getIdToken();
          const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          resolve(response);
        }),

        setDoc(doc(collections.users, user.uid), {
          name: user.displayName ?? '',
          email: user.email ?? '',
          authProvider: 'google',
        }),
      ]);

      const redirectUrl = new URLSearchParams(window.location.search).get('redirect');

      if (redirectUrl !== null && redirectUrl.startsWith('/')) {
        window.location.assign(redirectUrl);
      } else if (response.redirected) {
        window.location.assign(response.url);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrimaryButton disabled={isLoading()} onClick={handleLogin}>
      <Show when={!isLoading()} fallback="...">
        Login with Google
      </Show>
    </PrimaryButton>
  );
};

export default LoginForm;
