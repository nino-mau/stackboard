import {
  createFileRoute,
  Outlet,
  redirect,
  useRouteContext,
} from '@tanstack/react-router';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { getSession } from '@/server/functions/auth';

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayoutComponent,
  beforeLoad: async () => {
    const session = await getSession();

    if (!session?.user) {
      throw redirect({ to: '/auth/login' });
    }

    return { user: session.user };
  },
});

function DashboardLayoutComponent() {
  const { user } = useRouteContext({ from: '/_dashboard' });
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
