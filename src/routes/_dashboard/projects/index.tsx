import { createFileRoute, useRouteContext } from '@tanstack/react-router';
import NewProjectModal from '@/components/new-project-modal';
import RegistrationToast from '@/components/ui/registration-toast';
import { session } from '@/server/db/auth';

export const Route = createFileRoute('/_dashboard/projects/')({
  component: ProjectsPage,
});

function ProjectsPage() {
  const { user } = useRouteContext({ from: '/_dashboard' });
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <RegistrationToast
        userName={user.name}
        avatarUrl={user.image ?? undefined}
      />
      {/* <NewProjectModal /> */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
