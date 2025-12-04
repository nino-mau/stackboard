import { InteractiveGridPattern } from '@/components/background/interactive-grid-pattern';
import RegisterForm from './_components/register-form';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function RegisterPage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center p-6 md:p-10">
      <div className="z-10 w-fit">
        <RegisterForm />
      </div>
      <InteractiveGridPattern
        className={cn(
          '[mask-image:radial-gradient(50%_95%_at_top,black,transparent)]',
          '-top-[150px] mr-25 skew-y-11'
        )}
      />
    </div>
  );
}
