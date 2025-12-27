'use client';

import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar';
import { sidebarConfig } from '@/config/sidebar';
import { isSidebarType, SidebarType } from '@/types/sidebar';
import { getSectionName } from '@/utils/misc';
import { redirect, usePathname } from 'next/navigation';
import SidebarNav from './sidebar-nav';

export function SecondarySidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const sectionName = getSectionName(usePathname());

  // Redirect to error page if the section name isn't valid
  if (!isSidebarType(sectionName)) {
    console.error('[SecondarySidebar] Typecheck of section name failed');
    redirect('/error');
  }

  const sidebarData = sidebarConfig[sectionName as SidebarType];

  return (
    <Sidebar
      collapsible="none"
      className="hidden w-72.5 flex-1 px-3 md:flex"
      {...props}
    >
      <SidebarHeader className="gap-4 px-0 py-2 pb-4">
        <div className="flex w-full flex-col">
          <p className="text-foreground text-base font-medium">
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
