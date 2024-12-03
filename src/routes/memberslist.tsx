import { createFileRoute } from "@tanstack/react-router";
import { membersQueryOptions } from "@/api/members";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/memberslist")({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(membersQueryOptions()),
  component: MembersListComponent,
});

function MembersListComponent() {
  const membersQuery = useSuspenseQuery(membersQueryOptions());
  const members = membersQuery.data;
  return `Hello /members ${members.length}!`;
}
