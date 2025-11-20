'use client';

import { Icon } from '@iconify/react';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import SiteLogo from './icon/site-logo';
import { NavUser } from './nav-user';
import { Info, Settings } from 'lucide-react';

// This is sample data
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    {
      title: 'Inbox',
      url: '#',
      icon: 'solar:box-minimalistic-bold-duotone',
      isActive: true
    },
    {
      title: 'Drafts',
      url: '#',
      icon: 'solar:card-bold-duotone',
      isActive: false
    },
    {
      title: 'Sent',
      url: '#',
      icon: 'solar:album-bold-duotone',
      isActive: false
    },
    {
      title: 'Junk',
      url: '#',
      icon: 'solar:user-rounded-bold-duotone',
      isActive: false
    },
    {
      title: 'Trash',
      url: '#',
      icon: 'solar:folder-2-bold-duotone',
      isActive: false
    }
  ]
};

export function PrimarySidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);

  return (
    <Sidebar collapsible="none" className="w-[61px] border-r py-1.5">
      <SidebarHeader className="flex items-center">
        <SiteLogo width={32} height={32} fill="var(--color-primary)" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="items-center">
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title} className="size-10">
                  <SidebarMenuButton
                    className="flex size-full items-center justify-center"
                    tooltip={{
                      children: item.title,
                      hidden: false
                    }}
                    isActive={activeItem?.title === item.title}
                  >
                    <Icon icon={item.icon} className="!size-5.5 stroke-[1.5]" />
                    {/* <item.icon className="!size-5.5 stroke-[1.5]" /> */}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="items-center gap-4">
          {/* Settings Button */}
          <SidebarMenuItem className="size-8">
            <SidebarMenuButton
              className="flex size-full items-center justify-center"
              tooltip={{
                children: 'Settings',
                hidden: false
              }}
            >
              <Settings className="!size-4" />
              {/* <item.icon className="!size-5.5 stroke-[1.5]" /> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* About Button */}
          <SidebarMenuItem className="size-8">
            <SidebarMenuButton
              className="flex size-full items-center justify-center"
              tooltip={{
                children: 'About',
                hidden: false
              }}
            >
              <Info className="!size-4" />
              {/* <item.icon className="!size-5.5 stroke-[1.5]" /> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="flex justify-center">
            <NavUser user={data.user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
