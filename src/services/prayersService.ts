import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";
import { supabase } from "@/lib/supabase";

const TABLE_NAME = "prayers";

type PrayerInsert = TablesInsert<"prayers">;
type PrayerUpdate = TablesUpdate<"prayers">;

type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<TValue, TKey> &
  Required<Pick<TValue, TKey>>;

// Get all prayers
export async function fetchPrayers() {
  const { data, error } = await supabase.from(TABLE_NAME).select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Get a prayer by id
export async function fetchPrayerById(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).select().eq("id", id).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Insert a new prayer
export async function postPrayer(newPrayer: PrayerInsert) {
  const { data, error } = await supabase.from(TABLE_NAME).insert(newPrayer).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Prayers bulk insert
export async function postPrayers(newPrayers: PrayerInsert[]) {
  const { data, error } = await supabase.from(TABLE_NAME).insert(newPrayers);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Update a prayer
export async function patchPrayer({
  id,
  ...updatedPrayer
}: PickAsRequired<Partial<PrayerUpdate>, "id">) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedPrayer)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete a prayer
export async function deletePrayer(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
