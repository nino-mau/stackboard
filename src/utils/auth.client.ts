'use client';

import { authClient } from '@/lib/auth-client';

/**
 * Logout user and redirect them to login page
 */
export async function logout() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = '/auth/login';
      }
    }
  });
}

/**
 * Login with specified oauth provider
 */
export async function loginWithOAuth(provider: 'github' | 'google') {
  if (provider === 'github') {
    await authClient.signIn.social({
      provider: 'github'
    });
  }
  return;
}
