import { createFileRoute } from "@tanstack/react-router";
import { membersQueryOptions, mdGetMembers } from "@/api/members";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/memberslist")({
  loader: (opts) => opts.context.queryClient.ensureQueryData(mdGetMembers()),
  component: MembersListComponent,
});

function MembersListComponent() {
  const membersQuery = useSuspenseQuery(mdGetMembers());
  const members = membersQuery.data;
  return `Hello /members ${members.length}!`;
}
