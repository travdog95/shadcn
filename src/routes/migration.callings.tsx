import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCreateCallings } from "@/api/callings";
import { mdGetCallings } from "@/api/mongo";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/migration/callings")({
  loader: (opts) => opts.context.queryClient.ensureQueryData(mdGetCallings()),
  component: MigrationComponent,
});

function MigrationComponent() {
  const callingsQuery = useSuspenseQuery(mdGetCallings());
  const callings: Array<{ [key: string]: any }> = callingsQuery.data;
  const createCallings = useCreateCallings();

  const handleMigrateCallings = async () => {
    const transformedCallings = callings.map((m: { [key: string]: any }) => {
      //populate mdID with _id
      m.mdID = m._id;
      // remove unnecessary fields
      delete m._id;
      delete m.__v;
      delete m.createdAt;
      delete m.updatedAt;
      delete m.schemaVersion;
      return m;
    });

    // Perform bulk insert
    createCallings.mutate(transformedCallings, {
      onSuccess: () => {
        console.log("Migrated Callings");
      },
      onError: (error) => {
        console.error("Error migrating callings:", error);
      },
    });
  };

  return (
    <div>
      <Button disabled onClick={handleMigrateCallings}>
        Migrate Callings
      </Button>
      {createCallings.isPending && <div>Migrating...</div>}
      <p>Completed</p>
    </div>
  );
}
