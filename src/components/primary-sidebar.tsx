import {
  InformationCircleIcon,
  Settings01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
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
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { User } from '@/types/user';
import { Cube, Database, Folder, Gear } from './icon';
import SiteLogo from './icon/SiteLogo';
import { NavUser } from './nav-user';

// This is sample data
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Inbox',
      url: '#',
      icon: Cube,
      isActive: true,
    },
    {
      title: 'Drafts',
      url: '#',
      icon: Database,
      isActive: false,
    },
    {
      title: 'Sent',
      url: '#',
      icon: Folder,
      isActive: false,
    },
    {
      title: 'Junk',
      url: '#',
      icon: Gear,
      isActive: false,
    },
  ],
};

type PrimarySidebarProps = {
  user: User;
};

export function PrimarySidebar(props: PrimarySidebarProps) {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);

  return (
    <Sidebar collapsible="none" className="w-17.5! border-r py-1.5 pt-0!">
      <SidebarHeader className="flex h-(--header-height) items-center justify-center border-b p-0!">
        <SiteLogo width={37} height={37} />
      </SidebarHeader>
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="items-center gap-2">
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title} className="size-10!">
                  <SidebarMenuButton
                    className="flex size-full items-center justify-center group-data-[collapsible=icon]:size-full!"
                    tooltip={{
                      children: item.title,
                      hidden: false,
                    }}
                    isActive={activeItem?.title === item.title}
                  >
                    {/* <Icon icon={item.icon} className="!size-5.5 stroke-[1.5]" /> */}
                    <item.icon className="size-5.5! stroke-[1.5]" />
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
                hidden: false,
              }}
            >
              <HugeiconsIcon icon={Settings01Icon} className="size-4" />
              {/* <item.icon className="!size-5.5 stroke-[1.5]" /> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* About Button */}
          <SidebarMenuItem className="size-8">
            <SidebarMenuButton
              className="flex size-full items-center justify-center"
              tooltip={{
                children: 'About',
                hidden: false,
              }}
            >
              <HugeiconsIcon icon={InformationCircleIcon} className="size-4" />
              {/* <item.icon className="!size-5.5 stroke-[1.5]" /> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="flex justify-center">
            <NavUser user={props.user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
