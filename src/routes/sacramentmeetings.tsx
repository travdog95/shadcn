import { createFileRoute } from "@tanstack/react-router";
import { sacramentMeetingsQueryOptions } from "@/api/sacramentmeetings";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/sacramentmeetings")({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(sacramentMeetingsQueryOptions()),
  component: SacramentMeetingsComponent,
});

function SacramentMeetingsComponent() {
  const meetingsQuery = useSuspenseQuery(sacramentMeetingsQueryOptions());
  const meetings = meetingsQuery.data;
  return `Hello /sacramentmeetings ${meetings.length}!`;
}
