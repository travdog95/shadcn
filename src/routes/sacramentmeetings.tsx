import { createFileRoute } from "@tanstack/react-router";
import { sacramentmeetingsQueryOptions } from "@/api/sacramentmeetings";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/sacramentmeetings")({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(sacramentmeetingsQueryOptions()),
  component: SacramentMeetingsComponent,
});

function SacramentMeetingsComponent() {
  const meetingsQuery = useSuspenseQuery(sacramentmeetingsQueryOptions());
  const meetings = meetingsQuery.data;
  return `Hello /sacramentmeetings ${meetings.length}!`;
}
