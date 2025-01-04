import { createFileRoute } from "@tanstack/react-router";
import { mdGetTalks } from "@/api/mongo";
import { membersQueryOptions } from "@/api/members";
import { sacramentMeetingsQueryOptions } from "@/api/sacramentmeetings";
import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Tables } from "@/utils/supabase.types";
import { useCreateTalks } from "@/api/talks";

export const Route = createFileRoute("/migration/talks")({
  loader: async (opts) => {
    await opts.context.queryClient.ensureQueryData(mdGetTalks());
    await opts.context.queryClient.ensureQueryData(membersQueryOptions());
    await opts.context.queryClient.ensureQueryData(sacramentMeetingsQueryOptions());
  },
  component: RouteComponent,
});

type Member = Tables<"members">;
type SacramentMeeting = Tables<"sacramentmeetings">;

function RouteComponent() {
  const talksQuery = useSuspenseQuery(mdGetTalks());
  const talks: Array<{ [key: string]: any }> = talksQuery.data;

  const membersQuery = useSuspenseQuery(membersQueryOptions());
  const members: Array<Member> = membersQuery.data;

  const sacramentMeetingsQuery = useSuspenseQuery(sacramentMeetingsQueryOptions());
  const sacramentMeetings: Array<SacramentMeeting> = sacramentMeetingsQuery.data;

  const createTalks = useCreateTalks();

  const handleMigration = () => {
    const transformedTalks = talks.map((talk: { [key: string]: any }) => {
      // find member id from members table by mdID
      const member = members.find((m) => m.mdID === talk.member);
      if (member) talk.memberId = member.id;

      // find sacrament meeting id from sacrament meetings table by mdID
      const sacramentMeeting = sacramentMeetings.find((sm) => sm.mdID === talk.sacramentMeeting);
      if (sacramentMeeting) talk.sacramentMeetingId = sacramentMeeting.id;

      // remove unnecessary fields
      delete talk.member;
      delete talk.sacramentMeeting;
      delete talk._id;
      delete talk.__v;
      delete talk.createdAt;
      delete talk.updatedAt;
      delete talk.updatedAt;
      delete talk.schemaVersion;
      delete talk.userCreated;
      return talk;
    });

    console.log(transformedTalks);

    // Perform bulk insert
    createTalks.mutate(transformedTalks, {
      onSuccess: () => {
        console.log("Talks migrated successfully");
      },
      onError: (error) => {
        console.error("Error migrating talks:", error);
      },
    });
  };

  return (
    <div>
      <Button disabled onClick={handleMigration}>
        Migrate Talks
      </Button>
      {createTalks.isPending && <div>Migrating...</div>}
      <p>Completed</p>
    </div>
  );
}
