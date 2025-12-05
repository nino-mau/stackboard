import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Redirect user with invalid session to register page
 */
export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  /**
   * Auth Check
   */
  if (!session) {
    console.log(
      '[utils:requireAuth()] Auth check failed, Redirecting to register page...'
    );
    redirect('/auth/register');
  }
}
