import { IconSvgElement, type HugeiconsIcon } from '@hugeicons/react';

/**
 * A section of the sidebar which represent a page group
 */
export type SidebarSectionType = 'projects' | 'files';

export const SIDEBAR_SECTIONS: SidebarSectionType[] = ['projects', 'files'];

/**
 * Typeguard for SidebarSectionType
 */
export function isSidebarSectionType(
  value: string
): value is SidebarSectionType {
  return SIDEBAR_SECTIONS.includes(value as SidebarSectionType);
}

/**
 * Section of the secondary siderbar, correspond to a page group
 */
export type SidebarSection = {
  label: string;
  items: SidebarItem[];
};

/**
 * Item of the sidebar
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
