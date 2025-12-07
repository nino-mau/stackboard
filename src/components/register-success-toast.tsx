import { ShieldCheck } from 'lucide-react';

type Props = {
  userName: string;
  avatarUrl?: string;
};

export default function RegisterSuccessToast({ userName }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary/10 rounded-md p-2">
        <ShieldCheck className="text-primary size-6" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-foreground text-sm font-normal">
          Welcome, <span className="font-bold">{userName}</span> !
        </p>
        <p className="text-muted-foreground text-xs">
          Workspace created successfully.
        </p>
      </div>
    </div>
  );
}
