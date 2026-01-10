import { redirect, useLocation } from '@tanstack/react-router';
import type * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { sidebarConfig } from '@/config/sidebar';
import { isSidebarType, type SidebarType } from '@/types/sidebar';
import { getSectionName } from '@/utils/misc';
import SidebarNav from './sidebar-nav';

export function SecondarySidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const sectionName = getSectionName(pathname);

  // Redirect to error page if the section name isn't valid
  if (!isSidebarType(sectionName)) {
    console.error('[SecondarySidebar] Typecheck of section name failed');
    redirect({ to: '/error' });
  }

  const sidebarData = sidebarConfig[sectionName as SidebarType];

  return (
    <Sidebar
      collapsible="none"
      className="hidden w-60 flex-1 px-2 md:flex"
      {...props}
    >
      <SidebarHeader className="gap-4 px-2 py-2 pt-3 pb-4">
        <div className="flex w-full flex-col">
          <p className="font-medium text-base text-foreground">
            {sidebarData.header.title}
          </p>
          <p className="text-muted-foreground text-xs">
            {sidebarData.header.description}
          </p>
        </div>

        {/* Action Button */}
        {sidebarData.header.actionButton && sidebarData.header.actionButton}
        {/* <SidebarInput placeholder="Type to search..." /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav sections={sidebarData.sections} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
