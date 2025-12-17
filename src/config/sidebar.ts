import { SidebarSection, SidebarSectionType } from '@/types/sidebar';
import { Bot, Frame, PieChart } from 'lucide-react';

/**
 * Sidebar configuration object, each section correspond to a page group
 */
export const sidebarConfig: Record<SidebarSectionType, SidebarSection[]> = {
  projects: [
    {
      label: '',
      items: [
        {
          title: 'All Projects',
          url: '#',
          icon: Bot
        }
      ]
    },
    {
      label: 'Projects',
      items: [
        {
          title: 'test',
          url: '#',
          icon: Bot
        }
      ]
    }
  ],
  files: [
    {
      label: '',
      items: [
        {
          title: 'All Files',
          url: '#',
          icon: Bot
        }
      ]
    },
    {
      label: 'Files',
      items: [
        {
          title: 'test',
          url: '#',
          icon: Bot
        }
      ]
    }
  ]
};
