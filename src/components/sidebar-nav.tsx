'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from '@/components/ui/sidebar';
import type { SidebarSection } from '@/types/sidebar';

import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export default function SidebarNav({
  sections
}: {
  sections: SidebarSection[];
}) {
  return sections.map((section) => (
    <SidebarGroup
      key={section.label}
      className="px-0 group-data-[collapsible=icon]:hidden"
    >
      {section.label && (
        <SidebarGroupLabel className="px-0">{section.label}</SidebarGroupLabel>
      )}
      <SidebarMenu>
        {section.items.map((item) =>
          item.subItems ? (
            // Item with dropdown menu
            <Collapsible
              key={item.title}
              defaultOpen={item.isActive}
              className="group/collapsible"
              render={<SidebarMenuItem />}
            >
              <SidebarMenuButton
                tooltip={item.title}
                render={<CollapsibleTrigger />}
              >
                <HugeiconsIcon icon={item.icon} /> <span>{item.title}</span>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="ml-auto transition-transform duration-100 group-data-open/collapsible:rotate-90"
                />
              </SidebarMenuButton>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.subItems?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton render={<a href={subItem.url} />}>
                        {subItem.title}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            // Item without dropdown menu
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton render={<a href={item.url} />}>
                <HugeiconsIcon icon={item.icon} />
                {item.title}
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  ));
}
