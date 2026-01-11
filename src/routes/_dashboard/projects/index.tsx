import { createFileRoute, useRouteContext } from '@tanstack/react-router';
import RegistrationToast from '@/components/ui/registration-toast';

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
    </div>
  );
}
