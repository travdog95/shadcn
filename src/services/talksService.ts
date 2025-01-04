import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";
import { supabase } from "@/lib/supabase";

const TABLE_NAME = "talks";

type TalkInsert = TablesInsert<"talks">;
type TalkUpdate = TablesUpdate<"talks">;

type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<TValue, TKey> &
  Required<Pick<TValue, TKey>>;

// Get all talks
export async function fetchTalks() {
  const { data, error } = await supabase.from(TABLE_NAME).select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Get a talk by id
export async function fetchTalkById(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).select().eq("id", id).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Insert a new talk
export async function postTalk(newTalk: TalkInsert) {
  const { data, error } = await supabase.from(TABLE_NAME).insert(newTalk).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Talks bulk insert
export async function postTalks(newTalks: TalkInsert[]) {
  const { data, error } = await supabase.from(TABLE_NAME).insert(newTalks);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Update a talk
export async function patchTalk({ id, ...updatedTalk }: PickAsRequired<Partial<TalkUpdate>, "id">) {
  const { data, error } = await supabase.from(TABLE_NAME).update(updatedTalk).eq("id", id).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete a talk
export async function deleteTalk(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
