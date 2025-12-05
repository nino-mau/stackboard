import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { requireAuth } from '@/utils/auth';
import { headers } from 'next/headers';

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  requireAuth();

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '350px'
        } as React.CSSProperties
      }
    >
      <AppSidebar user={session!.user} />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
