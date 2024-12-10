import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCreateFiles } from "@/api/files";
import { mdGetFiles } from "@/api/mongo";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/migration/files")({
  loader: (opts) => opts.context.queryClient.ensureQueryData(mdGetFiles()),
  component: MigrationComponent,
});

function MigrationComponent() {
  const filesQuery = useSuspenseQuery(mdGetFiles());
  const files: Array<{ [key: string]: any }> = filesQuery.data;
  const createFiles = useCreateFiles();

  const handleMigrateFiles = async () => {
    const transformedFiles = files.map((m: { [key: string]: any }) => {
      delete m._id;
      delete m.__v;
      delete m.createdAt;
      delete m.updatedAt;
      delete m.schemaVersion;
      return m;
    });

    // Perform bulk insert
    createFiles.mutate(transformedFiles, {
      onSuccess: () => {
        console.log("Migrated Files");
      },
      onError: (error) => {
        console.error("Error migrating files:", error);
      },
    });
  };

  return (
    <div>
      <Button disabled onClick={handleMigrateFiles}>
        Migrate Files
      </Button>
      {createFiles.isPending && <div>Migrating...</div>}
      <p>Completed</p>
    </div>
  );
}
