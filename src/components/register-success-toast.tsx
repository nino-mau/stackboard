import { Blockchain01Icon, UserSquareIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

type Props = {
  userName: string;
  avatarUrl?: string;
};

export default function RegisterSuccessToast({ userName }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-md bg-primary/10 p-2">
        <HugeiconsIcon
          icon={Blockchain01Icon}
          className="size-5.5 text-primary"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="font-normal text-foreground text-sm leading-none">
          Welcome, <span className="font-bold">{userName} !</span>
        </p>
        <p className="pb-0.5 text-muted-foreground text-xs leading-none">
          Workspace created successfully.
        </p>
      </div>
    </div>
  );
}
