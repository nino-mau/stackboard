import { Button } from '@/components/ui/button';
import { IconSvgElement } from '@hugeicons/react';
import { ComponentProps, ReactElement } from 'react';

/**
 * A section of the sidebar which represent a page group
 */
export type SidebarType = 'projects' | 'files' | 'test';

export const SIDEBAR_SECTIONS: SidebarType[] = ['projects', 'files', 'test'];

/**
 * Typeguard for SidebarType
 */
export function isSidebarType(value: string): value is SidebarType {
  return SIDEBAR_SECTIONS.includes(value as SidebarType);
}

export type Sidebar = {
  header: SidebarHeader;
  sections: SidebarSection[];
};

/**
 * Header of the sidebar
 */
export type SidebarHeader = {
  title: string;
  description: string;
  actionButton?: ReactElement<ComponentProps<typeof Button>>;
};

/**
 * Section of the sidebar
 */
export type SidebarSection = {
  label: string;
  items: SidebarItem[];
};

/**
 * Item of a sidebar section
 */
export type SidebarItem = {
  title: string;
  url: string;
  icon: IconSvgElement;
  isActive?: boolean;
  subItems?: SidebarSubItem[];
};

/**
 * Subitem of a sidebar item
 */
export type SidebarSubItem = {
  title: string;
  url: string;
};
