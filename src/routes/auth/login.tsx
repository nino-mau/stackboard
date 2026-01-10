import { createFileRoute } from '@tanstack/react-router';
import { InteractiveGridPattern } from '@/components/background/interactive-grid-pattern';
import { cn } from '@/lib/utils';
import LoginForm from './-components/login-form';

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center p-6 md:p-10">
      <div className="z-10 w-fit">
        <LoginForm />
      </div>
      <InteractiveGridPattern
        className={cn(
          'mask-[radial-gradient(50%_95%_at_top,black,transparent)]',
          '-top-37.5 mr-25 skew-y-11'
        )}
      />
    </div>
  );
}
