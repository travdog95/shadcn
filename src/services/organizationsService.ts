import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";
import { supabase } from "@/lib/supabase";

const TABLE_NAME = "organizations";

type OrganizationInsert = TablesInsert<"organizations">;
type OrganizationUpdate = TablesUpdate<"organizations">;
type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<TValue, TKey> &
  Required<Pick<TValue, TKey>>;

export async function fetchOrganizations() {
  const { data, error } = await supabase.from(TABLE_NAME).select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function fetchOrganizationById(id: number) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select()
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function postOrganization(newOrganization: OrganizationInsert) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(newOrganization)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Member organizations bulk insert
export async function postOrganizations(
  newOrganizations: OrganizationInsert[]
) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(newOrganizations);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function patchOrganization({
  id,
  ...updatedOrganization
}: PickAsRequired<Partial<OrganizationUpdate>, "id">) {
  // Update the organization in Supabase
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedOrganization)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
