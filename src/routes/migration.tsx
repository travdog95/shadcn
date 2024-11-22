import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/migration")({
  // loader: (opts) => opts.context.queryClient.ensureQueryData(getMembers()),

  component: MigrationComponent,
});

function MigrationComponent() {
  // const membersQuery = useSuspenseQuery(getMembers());
  // const members = membersQuery.data;

  return `Hello /migration!`;
}
