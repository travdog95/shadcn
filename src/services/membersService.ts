import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";
import { supabase } from "@/lib/supabase";

const TABLE_NAME = "members";

type MemberInsert = TablesInsert<"members">;
type MemberUpdate = TablesUpdate<"members">;

type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<TValue, TKey> &
  Required<Pick<TValue, TKey>>;

// Get all members
export async function fetchMembers() {
  const { data, error } = await supabase.from(TABLE_NAME).select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Get a member by id
export async function fetchMemberById(id: number) {
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

// Insert a new member
export async function postMember(newMember: MemberInsert) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(newMember)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Members bulk insert
export async function postMembers(newMembers: MemberInsert[]) {
  const { data, error } = await supabase.from(TABLE_NAME).insert(newMembers);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Update a member
export async function patchMember({
  id,
  ...updatedMember
}: PickAsRequired<Partial<MemberUpdate>, "id">) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedMember)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete a member
export async function deleteMember(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
