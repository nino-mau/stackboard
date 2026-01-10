import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/error')({
  component: ErrorDefault,
});

function ErrorDefault() {
  return <div></div>;
}
