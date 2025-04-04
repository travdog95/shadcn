import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";
import { supabase } from "@/lib/supabase";

const TABLE_NAME = "callings";

type CallingInsert = TablesInsert<"callings">;
type CallingUpdate = TablesUpdate<"callings">;
type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<TValue, TKey> &
  Required<Pick<TValue, TKey>>;

// Get all callings
export async function fetchCallings() {
  const { data, error } = await supabase.from(TABLE_NAME).select().order("id");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Get a calling by id
export async function fetchCallingById(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).select().eq("id", id).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Insert a new calling
export async function postCalling(newCalling: CallingInsert) {
  const { data, error } = await supabase.from(TABLE_NAME).insert(newCalling).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Callings bulk insert
export async function postCallings(newCallings: CallingInsert[]) {
  const { data, error } = await supabase.from(TABLE_NAME).insert(newCallings);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Update a calling
export async function patchCalling({
  id,
  ...updatedCalling
}: PickAsRequired<Partial<CallingUpdate>, "id">) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedCalling)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete a calling
export async function deleteCalling(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
