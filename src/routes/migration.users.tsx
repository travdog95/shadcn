import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCreateUsers } from "@/api/users";
import { mdGetUsers } from "@/api/mongo";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/migration/users")({
  loader: (opts) => opts.context.queryClient.ensureQueryData(mdGetUsers()),
  component: MigrationComponent,
});

function MigrationComponent() {
  const usersQuery = useSuspenseQuery(mdGetUsers());
  const users: Array<{ [key: string]: any }> = usersQuery.data;
  const createUsers = useCreateUsers();

  const handleMigrateUsers = async () => {
    const transformedUsers = users.map((m: { [key: string]: any }) => {
      delete m._id;
      delete m.__v;
      delete m.createdAt;
      delete m.updatedAt;
      delete m.schemaVersion;
      delete m.rights;
      return m;
    });

    // Perform bulk insert
    createUsers.mutate(transformedUsers, {
      onSuccess: () => {
        console.log("Migrated Users");
      },
      onError: (error) => {
        console.error("Error migrating users:", error);
      },
    });
  };

  return (
    <div>
      <Button disabled onClick={handleMigrateUsers}>
        Migrate Users
      </Button>
      {createUsers.isPending && <div>Migrating...</div>}
      <p>Completed</p>
    </div>
  );
}
