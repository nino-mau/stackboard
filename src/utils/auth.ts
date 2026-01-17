import { redirect } from '@tanstack/react-router';
import { authClient } from '@/lib/auth-client';

/**
 * Logout user and redirect them to login page
 */
export async function logout() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        redirect({ to: '/auth/login' });
      },
    },
  });
}

/**
 * Login with specified oauth provider
 */
export async function loginWithOAuth(provider: 'github' | 'google') {
  await authClient.signIn.social({
    provider,
    callbackURL: '/projects',
  });
}
