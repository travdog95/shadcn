import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCreateMembers } from "@/api/members";
import { mdGetMembers } from "@/api/mongo";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/migration/members")({
  loader: (opts) => opts.context.queryClient.ensureQueryData(mdGetMembers()),
  component: MigrationComponent,
});

function MigrationComponent() {
  const membersQuery = useSuspenseQuery(mdGetMembers());
  const members: Array<{ [key: string]: any }> = membersQuery.data;
  const createMembers = useCreateMembers();

  const handleMigrateMembers = async () => {
    const transformedMembers = members.map((m: { [key: string]: any }) => {
      //populate mdID with _id
      m.mdID = m._id;
      delete m._id;
      delete m.__v;
      delete m.callings;
      delete m.createdAt;
      delete m.updatedAt;
      delete m.schemaVersion;
      return m;
    });

    createMembers.mutate(
      transformedMembers.filter((m) => m !== undefined),
      {
        onSuccess: () => {
          console.log("Migrated Members");
        },
        onError: (error) => {
          console.error("Error migrating members:", error);
        },
      }
    );
  };

  return (
    <div>
      <Button disabled onClick={handleMigrateMembers}>
        Migrate Members
      </Button>
      {createMembers.isPending && <div>Migrating...</div>}
      <p>Completed</p>
    </div>
  );
}
