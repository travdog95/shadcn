import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { useCreateMemberCallings } from "@/api/membercallings";
import { callingsQueryOptions } from "@/api/callings";
import { membersQueryOptions } from "@/api/members";
import { mdGetMemberCallings } from "@/api/mongo";
import { Tables } from "@/utils/supabase.types";

export const Route = createFileRoute("/migration/membercallings")({
  loader: async (opts) => {
    await opts.context.queryClient.ensureQueryData(mdGetMemberCallings());
    await opts.context.queryClient.ensureQueryData(callingsQueryOptions());
    await opts.context.queryClient.ensureQueryData(membersQueryOptions());
  },
  component: MemberCallingsMigrationComponent,
});

type Calling = Tables<"callings">;
type Member = Tables<"members">;

function MemberCallingsMigrationComponent() {
  const memberCallingsQuery = useSuspenseQuery(mdGetMemberCallings());
  const memberCallings: Array<{ [key: string]: any }> = memberCallingsQuery.data;
  const callingsQuery = useSuspenseQuery(callingsQueryOptions());
  const callings: Array<Calling> = callingsQuery.data;
  const membersQuery = useSuspenseQuery(membersQueryOptions());
  const members: Array<Member> = membersQuery.data;

  const createMemberCallings = useCreateMemberCallings();

  const handleMigrateMemberCallings = () => {
    const transformedMemberCallings = memberCallings.map(
      (memberCalling: { [key: string]: any }) => {
        // find calling id from callings table by mdID
        const calling = callings.find((c) => c.mdID === memberCalling.calling);
        if (calling) memberCalling.callingId = calling.id;

        //find member id from members table by mdID
        const member = members.find((m) => m.mdID === memberCalling.member);
        if (member) memberCalling.memberId = member.id;

        // remove unnecessary fields
        delete memberCalling.calling;
        delete memberCalling.member;
        delete memberCalling._id;
        delete memberCalling.__v;
        delete memberCalling.createdAt;
        delete memberCalling.updatedAt;
        delete memberCalling.updatedAt;
        delete memberCalling.schemaVersion;
        delete memberCalling.userCreated;
        return memberCalling;
      }
    );

    console.log(transformedMemberCallings);

    // Perform bulk insert
    createMemberCallings.mutate(transformedMemberCallings, {
      onSuccess: () => {
        console.log("Migrated Member Callings");
      },
      onError: (error) => {
        console.error("Error migrating member callings:", error);
      },
    });
  };

  return (
    <div>
      <Button disabled onClick={handleMigrateMemberCallings}>
        Migrate Member Callings
      </Button>
      {createMemberCallings.isPending && <div>Migrating...</div>}
      <p>Completed</p>
    </div>
  );
}
