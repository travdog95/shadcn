import { callingsQueryOptions } from "@/api/callings";
import { useCreateCallingWorkshopItems } from "@/api/callingworkshopitems";
import { membersQueryOptions } from "@/api/members";
import { mdGetCallingWorkshopItems } from "@/api/mongo";
import { Button } from "@/components/ui/button";
import { Tables } from "@/utils/supabase.types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/migration/callingworkshopitems")({
  loader: async (opts) => {
    await opts.context.queryClient.ensureQueryData(mdGetCallingWorkshopItems());
    await opts.context.queryClient.ensureQueryData(membersQueryOptions());
    await opts.context.queryClient.ensureQueryData(callingsQueryOptions());
  },
  component: CallingWorkshopRouteComponent,
});

type Member = Tables<"members">;
type Calling = Tables<"callings">;

function CallingWorkshopRouteComponent() {
  const membersQuery = useSuspenseQuery(membersQueryOptions());
  const members: Array<Member> = membersQuery.data;
  const callingsQuery = useSuspenseQuery(callingsQueryOptions());
  const callings: Array<Calling> = callingsQuery.data;
  const callingWorkshopItemsQuery = useSuspenseQuery(mdGetCallingWorkshopItems());
  const callingWorkshopItems: Array<{ [key: string]: any }> = callingWorkshopItemsQuery.data;
  const createCallingWorkshopItems = useCreateCallingWorkshopItems();

  const handleMigration = () => {
    const transformedCallingWorkshopItems = callingWorkshopItems.map(
      (callingWorkshopItem: { [key: string]: any }) => {
        // find member id from members table by mdID for currentOfficer
        const currentOfficer = members.find((m) => m.mdID === callingWorkshopItem.currentOfficer);
        if (currentOfficer) callingWorkshopItem.currentOfficerId = currentOfficer.id;

        // find calling id from callings table by callingID
        const calling = callings.find((c) => c.mdID === callingWorkshopItem.calling);
        if (calling) callingWorkshopItem.callingId = calling.id;

        // Create proposed officers array

        // release status

        // sustain status

        // remove unnecessary fields
        delete callingWorkshopItem.proposedOfficers;
        delete callingWorkshopItem.currentOfficer;
        delete callingWorkshopItem.calling;
        delete callingWorkshopItem._id;
        delete callingWorkshopItem.__v;
        delete callingWorkshopItem.createdAt;
        delete callingWorkshopItem.updatedAt;
        delete callingWorkshopItem.updatedAt;
        delete callingWorkshopItem.schemaVersion;
        delete callingWorkshopItem.userCreated;
        return callingWorkshopItem;
      }
    );

    console.log(transformedCallingWorkshopItems);

    // Perform bulk insert
    createCallingWorkshopItems.mutate(transformedCallingWorkshopItems, {
      onSuccess: () => {
        console.log("Calling Workshop Items migrated successfully");
      },
      onError: (error) => {
        console.error("Error migrating calling workshop items:", error);
      },
    });
  };

  return (
    <div>
      <Button disabled onClick={handleMigration}>
        Migrate Calling Workshop Items
      </Button>
      {createCallingWorkshopItems.isPending && <div>Migrating...</div>}
      <p>Completed</p>
    </div>
  );
}
