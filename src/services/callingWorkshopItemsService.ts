import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";
import { supabase } from "@/lib/supabase";

const TABLE_NAME = "callingworkshopitems";

type CallingWorkshopItemInsert = TablesInsert<"callingworkshopitems">;
type CallingWorkshopItemUpdate = TablesUpdate<"callingworkshopitems">;

type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<TValue, TKey> &
  Required<Pick<TValue, TKey>>;

// Get all CallingWorkshopItems
export async function fetchCallingWorkshopItems() {
  const { data, error } = await supabase.from(TABLE_NAME).select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Get a CallingWorkshopItem by id
export async function fetchCallingWorkshopItemById(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).select().eq("id", id).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Insert a new CallingWorkshopItem
export async function postCallingWorkshopItem(newCallingWorkshopItem: CallingWorkshopItemInsert) {
  const { data, error } = await supabase.from(TABLE_NAME).insert(newCallingWorkshopItem).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// CallingWorkshopItems bulk insert
export async function postCallingWorkshopItems(
  newCallingWorkshopItems: CallingWorkshopItemInsert[]
) {
  const { data, error } = await supabase.from(TABLE_NAME).insert(newCallingWorkshopItems);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Update a CallingWorkshopItem
export async function patchCallingWorkshopItem({
  id,
  ...updatedCallingWorkshopItem
}: PickAsRequired<Partial<CallingWorkshopItemUpdate>, "id">) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedCallingWorkshopItem)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete a CallingWorkshopItem
export async function deleteCallingWorkshopItem(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
