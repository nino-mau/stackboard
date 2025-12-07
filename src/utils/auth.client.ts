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
