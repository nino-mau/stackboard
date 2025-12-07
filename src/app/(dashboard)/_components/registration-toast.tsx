'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import RegisterSuccessToast from '@/components/register-success-toast';

type Props = {
  userName?: string;
  avatarUrl?: string;
};

export default function RegistrationToast({ userName, avatarUrl }: Props) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const registered = searchParams.get('registered');

    if (registered === 'true' && userName) {
      const timeoutId = setTimeout(() => {
        toast(
          <RegisterSuccessToast userName={userName} avatarUrl={avatarUrl} />,
          {
            position: 'top-right',
            duration: 5000,
            dismissible: true,
            id: 'registration-success' // Prevent duplicate toasts
          }
        );
        // Clear the param from URL
        window.history.replaceState({}, '', window.location.pathname);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchParams, userName, avatarUrl]);

  return null;
}
