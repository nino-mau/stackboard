'use client';

import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link } from '@tanstack/react-router';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
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
} from '@/components/ui/sidebar';
import type { SidebarSection } from '@/types/sidebar';

export default function SidebarNav({
  sections,
}: {
  sections: SidebarSection[];
}) {
  return sections.map((section) => (
    <SidebarGroup
      key={section.label}
      className="px-2 group-data-[collapsible=icon]:hidden"
    >
      {section.label && (
        <SidebarGroupLabel className="px-2">{section.label}</SidebarGroupLabel>
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
                <HugeiconsIcon icon={item.icon} className="" />
                <span>{item.title}</span>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="ml-auto transition-transform duration-100 group-data-open/collapsible:rotate-90"
                />
              </SidebarMenuButton>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.subItems?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton render={<Link to={subItem.url} />}>
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
              <SidebarMenuButton render={<Link to={item.url} />}>
                <HugeiconsIcon icon={item.icon} className="" />
                <p className="">{item.title}</p>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  ));
}
