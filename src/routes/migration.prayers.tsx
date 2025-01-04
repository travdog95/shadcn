import { createFileRoute } from "@tanstack/react-router";
import { mdGetPrayers } from "@/api/mongo";
import { membersQueryOptions } from "@/api/members";
import { sacramentMeetingsQueryOptions } from "@/api/sacramentmeetings";
import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Tables } from "@/utils/supabase.types";
import { useCreatePrayers } from "@/api/prayers";

export const Route = createFileRoute("/migration/prayers")({
  loader: async (opts) => {
    await opts.context.queryClient.ensureQueryData(mdGetPrayers());
    await opts.context.queryClient.ensureQueryData(membersQueryOptions());
    await opts.context.queryClient.ensureQueryData(sacramentMeetingsQueryOptions());
  },
  component: RouteComponent,
});

type Member = Tables<"members">;
type SacramentMeeting = Tables<"sacramentmeetings">;

function RouteComponent() {
  const prayersQuery = useSuspenseQuery(mdGetPrayers());
  const prayers: Array<{ [key: string]: any }> = prayersQuery.data;

  const membersQuery = useSuspenseQuery(membersQueryOptions());
  const members: Array<Member> = membersQuery.data;

  const sacramentMeetingsQuery = useSuspenseQuery(sacramentMeetingsQueryOptions());
  const sacramentMeetings: Array<SacramentMeeting> = sacramentMeetingsQuery.data;

  const createPrayers = useCreatePrayers();

  const handleMigration = () => {
    const transformedPrayers = prayers.map((prayer: { [key: string]: any }) => {
      // find member id from members table by mdID
      const member = members.find((m) => m.mdID === prayer.member);
      if (member) prayer.memberId = member.id;

      // find sacrament meeting id from sacrament meetings table by mdID
      const sacramentMeeting = sacramentMeetings.find((sm) => sm.mdID === prayer.sacramentMeeting);
      if (sacramentMeeting) prayer.sacramentMeetingId = sacramentMeeting.id;

      // remove unnecessary fields
      delete prayer.member;
      delete prayer.sacramentMeeting;
      delete prayer._id;
      delete prayer.__v;
      delete prayer.createdAt;
      delete prayer.updatedAt;
      delete prayer.updatedAt;
      delete prayer.schemaVersion;
      delete prayer.userCreated;
      return prayer;
    });

    console.log(transformedPrayers);

    // Perform bulk insert
    createPrayers.mutate(transformedPrayers, {
      onSuccess: () => {
        console.log("Prayers migrated successfully");
      },
      onError: (error) => {
        console.error("Error migrating assignments:", error);
      },
    });
  };

  return (
    <div>
      <Button disabled onClick={handleMigration}>
        Migrate Prayers
      </Button>
      {createPrayers.isPending && <div>Migrating...</div>}
      <p>Completed</p>
    </div>
  );
}
