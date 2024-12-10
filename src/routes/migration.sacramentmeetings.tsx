import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCreateSacramentMeetings } from "@/api/sacramentmeetings";
import { mdGetSacramentMeetings } from "@/api/mongo";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/migration/sacramentmeetings")({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(mdGetSacramentMeetings()),
  component: MigrationComponent,
});

function MigrationComponent() {
  const sacramentMeetingsQuery = useSuspenseQuery(mdGetSacramentMeetings());
  const sacramentMeetings: Array<{ [key: string]: any }> =
    sacramentMeetingsQuery.data;
  const createSacramentMeetings = useCreateSacramentMeetings();

  const handleMigrateSacramentMeetings = async () => {
    const transformedSacramentMeetings = sacramentMeetings.map(
      (m: { [key: string]: any }) => {
        m.mdID = m._id;
        delete m._id;
        delete m.__v;
        delete m.createdAt;
        delete m.updatedAt;
        delete m.schemaVersion;
        delete m.month;
        delete m.year;
        delete m.prayers;
        delete m.talks;
        return {
          ...m,
          date: m.date || new Date().toISOString(), // Ensure 'date' property is included
        };
      }
    );

    // Perform bulk insert
    createSacramentMeetings.mutate(transformedSacramentMeetings, {
      onSuccess: () => {
        console.log("Migrated SacramentMeetings");
      },
      onError: (error) => {
        console.error("Error migrating sacramentMeetings:", error);
      },
    });
  };

  return (
    <div>
      <Button disabled onClick={handleMigrateSacramentMeetings}>
        Migrate Sacrament Meetings
      </Button>
      {createSacramentMeetings.isPending && <div>Migrating...</div>}
      <p>Completed</p>
    </div>
  );
}
