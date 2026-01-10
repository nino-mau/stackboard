import { db } from '@/lib/db';
import { project } from '@/server/db/project';
import type { HugeiconsName } from '@/types/icon';
import type { NewProject } from '@/types/project';

const DEFAULT_PROJECT_ICON: HugeiconsName = 'Square01Icon';

export const ProjectService = {
  async create(newProject: NewProject) {
    // Set default project icon
    if (!newProject.logoIconName && !newProject.logoEmoji) {
      newProject.logoIconName = DEFAULT_PROJECT_ICON;
    }
    await db.insert(project).values(newProject);
  },
};
