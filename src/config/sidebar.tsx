import {
  Blockchain01Icon,
  Blockchain02Icon,
  Blockchain03Icon,
  Blockchain04Icon,
  DashboardSquare01Icon,
  Layers01Icon,
  PlusSignIcon,
  Square01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import type { Sidebar, SidebarType } from '@/types/sidebar';

/**
 * Sidebar configuration object, each section correspond to a page group
 */
export const sidebarConfig: Record<SidebarType, Sidebar> = {
  projects: {
    header: {
      title: 'Project',
      description: 'Manage your projects',
      actionButton: (
        <Button variant="outline">
          <HugeiconsIcon icon={PlusSignIcon} />
          New Project
        </Button>
      ),
    },
    sections: [
      {
        label: '',
        items: [
          {
            title: 'Projects',
            url: '#',
            icon: Blockchain01Icon,
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
  },
  files: {
    header: { title: 'test', description: 'test' },
    sections: [
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
  },
  test: {
    header: { title: 'test', description: 'test' },
    sections: [
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
  },
};
