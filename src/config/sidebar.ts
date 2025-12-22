import { SidebarSection, SidebarSectionType } from '@/types/sidebar';
import { Layers01Icon, Square01Icon } from '@hugeicons/core-free-icons';

/**
 * Sidebar configuration object, each section correspond to a page group
 */
export const sidebarConfig: Record<SidebarSectionType, SidebarSection[]> = {
  projects: [
    {
      label: '',
      items: [
        {
          title: 'Projects',
          url: '#',
          icon: Layers01Icon,
        },
      ],
    },
    {
      label: 'Projects',
      items: [
        {
          title: 'test',
          url: '#',
          icon: Square01Icon,
        },
      ],
    },
  ],
  files: [
    {
      label: '',
      items: [
        {
          title: 'All Files',
          url: '#',
          icon: Square01Icon,
        },
      ],
    },
    {
      label: 'Files',
      items: [
        {
          title: 'test',
          url: '#',
          icon: Square01Icon,
        },
      ],
    },
  ],
};
