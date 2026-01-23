import {
  createFileRoute,
  Outlet,
  redirect,
  useRouteContext,
} from '@tanstack/react-router';
import AppHeader from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
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
        <AppHeader user={user} />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
