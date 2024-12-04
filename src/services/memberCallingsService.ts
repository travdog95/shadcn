import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";
import { supabase } from "@/lib/supabase";

const TABLE_NAME = "membercallings";

type MemberCallingInsert = TablesInsert<"membercallings">;
type MemberCallingUpdate = TablesUpdate<"membercallings">;

type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<TValue, TKey> &
  Required<Pick<TValue, TKey>>;

// Get all member callings
export async function fetchMemberCallings() {
  const { data, error } = await supabase.from(TABLE_NAME).select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Get a member calling by id
export async function fetchMemberCallingById(id: number) {
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

// Insert a new member calling
export async function postMemberCalling(newMemberCalling: MemberCallingInsert) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(newMemberCalling)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// MemberCallings bulk insert
export async function postMemberCallings(
  newMemberCallings: MemberCallingInsert[]
) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(newMemberCallings);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Update a member calling
export async function patchMemberCalling({
  id,
  ...updatedMemberCalling
}: PickAsRequired<Partial<MemberCallingUpdate>, "id">) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedMemberCalling)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete a member calling
export async function deleteMemberCalling(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
