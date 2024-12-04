import { Tables } from "@/utils/supabase.types";
import { organizationsQueryOptions } from "@/api/organizations";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function CallingFields({
  calling,
  disabled,
}: {
  calling: Tables<"callings">;
  disabled?: boolean;
}) {
  const orgQuery = useSuspenseQuery(organizationsQueryOptions());
  const orgs = orgQuery.data;

  return (
    <div className="space-y-2">
      <div>
        <input
          name="calling"
          defaultValue={calling.calling ?? ""}
          placeholder="Calling"
          className="border border-opacity-50 rounded p-2 w-full"
          disabled={disabled}
        />
      </div>
      <div>
        <select
          name="organizationId"
          disabled={disabled}
          className="border border-opacity-50 rounded p-1 w-full"
          defaultValue={calling.organizationId ?? ""}
        >
          <option value="">Select an organization</option>
          {orgs?.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
