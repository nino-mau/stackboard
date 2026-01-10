import { useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';
import RegisterSuccessToast from '@/components/register-success-toast';

type Props = {
  userName?: string;
  avatarUrl?: string;
};

export default function RegistrationToast({ userName, avatarUrl }: Props) {
  const search = useSearch({ strict: false });
  const registered = (search as { registered?: boolean })?.registered;

  useEffect(() => {
    if (registered && userName) {
      console.log('test');
      const timeoutId = setTimeout(() => {
        toast(
          <RegisterSuccessToast userName={userName} avatarUrl={avatarUrl} />,
          {
            position: 'top-center',
            duration: 10000000,
            dismissible: true,
            id: 'registration-success', // Prevent duplicate toasts
          }
        );
        // Clear the param from URL
        window.history.replaceState({}, '', window.location.pathname);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [registered, userName, avatarUrl]);

  return null;
}
