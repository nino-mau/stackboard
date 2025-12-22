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
import { SidebarSectionType } from '@/types/sidebar';
import { getSectionName } from '@/utils/misc';
import { usePathname } from 'next/navigation';
import SidebarNav from './sidebar-nav';

export function SecondarySidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const sectionName = getSectionName(usePathname());

  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex" {...props}>
      <SidebarHeader className="gap-3.5 p-4 pb-2">
        <div className="flex w-full flex-col">
          <p className="text-foreground text-base font-medium">Projects</p>
          <p className="text-muted-foreground text-xs">Manage your projects</p>
        </div>
        {/* <SidebarInput placeholder="Type to search..." /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav
          sections={sidebarConfig[sectionName as SidebarSectionType]}
        />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
