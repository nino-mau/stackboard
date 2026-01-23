import { Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { User } from '@/types/user';
import { NavUser } from './nav-user';
import { Button } from './ui/button';

type AppHeaderProps = {
  user: User;
};

export default function AppHeader(props: AppHeaderProps) {
  return (
    <div className="flex h-(--header-height) flex-row items-center justify-between border-b bg-card px-5">
      <Button variant="outline" size="icon">
        <HugeiconsIcon icon={Search01Icon} />
      </Button>
      <NavUser user={props.user} />
    </div>
  );
}
