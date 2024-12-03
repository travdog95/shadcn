import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { mdGetMembers, useCreateMember } from "@/api/members";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/migration/members")({
  loader: (opts) => opts.context.queryClient.ensureQueryData(mdGetMembers()),
  component: MigrationComponent,
});

function MigrationComponent() {
  const membersQuery = useSuspenseQuery(mdGetMembers());
  const members: Array<{ [key: string]: any }> = membersQuery.data;
  const createMember = useCreateMember();

  const handleMigrateMembers = async () => {
    members.forEach((m: { [key: string]: any }) => {
      if (m.firstName === "Travis") {
        //populate mdID with _id
        m.mdID = m._id;
        delete m._id;
        delete m.__v;
        delete m.callings;
        delete m.createdAt;
        delete m.updatedAt;
        delete m.schemaVersion;
        //Insert into Supabase Members table
        createMember.mutate(m);
      }
    });
  };

  return (
    <div>
      <Button onClick={handleMigrateMembers}>Migrate Members</Button>
    </div>
  );
}
