import { Tables } from "@/utils/supabase.types";

export default function OrganizationFields({
  organization,
  disabled,
}: {
  organization: Tables<"organizations">;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div>
        <input
          name="name"
          defaultValue={organization.name ?? ""}
          placeholder="Organization"
          className="border border-opacity-50 rounded p-2 w-full"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
