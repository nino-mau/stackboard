import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import RegistrationToast from './_components/registration-toast';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DashboardPage(props: Props) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <RegistrationToast
        userName={session?.user.name}
        avatarUrl={session?.user.image ?? undefined}
      />
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
