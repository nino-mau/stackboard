import { Sidebar } from '@/components/ui/sidebar';
import type { User } from '@/types/user';
import { PrimarySidebar } from './primary-sidebar';
import { SecondarySidebar } from './secondary-sidebar';

type AppSidebarProps = {
  user: User;
};

export function AppSidebar(props: AppSidebarProps) {
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
    >
      <PrimarySidebar user={props.user} />

      <SecondarySidebar />
    </Sidebar>
  );
}
