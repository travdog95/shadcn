import { useCreateAssignments } from "@/api/assignments";
import { membersQueryOptions } from "@/api/members";
import { mdGetAssignments } from "@/api/mongo";
import { Button } from "@/components/ui/button";
import { Tables } from "@/utils/supabase.types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/migration/assignments")({
  loader: async (opts) => {
    await opts.context.queryClient.ensureQueryData(mdGetAssignments());
    await opts.context.queryClient.ensureQueryData(membersQueryOptions());
  },
  component: AssignmentRouteComponent,
});

type Member = Tables<"members">;

function AssignmentRouteComponent() {
  const assignmentsQuery = useSuspenseQuery(mdGetAssignments());
  const assignments: Array<{ [key: string]: any }> = assignmentsQuery.data;

  const membersQuery = useSuspenseQuery(membersQueryOptions());
  const members: Array<Member> = membersQuery.data;

  const createAssignments = useCreateAssignments();

  const handleMigration = () => {
    const transformedAssignments = assignments.map((assignment: { [key: string]: any }) => {
      // find member id from members table by mdID
      const member = members.find((m) => m.mdID === assignment.conducting);
      if (member) assignment.conductingId = member.id;

      // remove unnecessary fields
      delete assignment.conducting;
      delete assignment._id;
      delete assignment.__v;
      delete assignment.createdAt;
      delete assignment.updatedAt;
      delete assignment.updatedAt;
      delete assignment.schemaVersion;
      delete assignment.userCreated;
      return assignment;
    });

    console.log(transformedAssignments);

    // Perform bulk insert
    createAssignments.mutate(transformedAssignments, {
      onSuccess: () => {
        console.log("Assignments migrated successfully");
      },
      onError: (error) => {
        console.error("Error migrating assignments:", error);
      },
    });
  };

  return (
    <div>
      <Button disabled onClick={handleMigration}>
        Migrate Assignments
      </Button>
      {createAssignments.isPending && <div>Migrating...</div>}
      <p>Completed</p>
    </div>
  );
}
