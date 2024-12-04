import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";
import { supabase } from "@/lib/supabase";

const TABLE_NAME = "sacramentmeetings";

type SacramentMeetingInsert = TablesInsert<"sacramentmeetings">;
type SacramentMeetingUpdate = TablesUpdate<"sacramentmeetings">;

type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<TValue, TKey> &
  Required<Pick<TValue, TKey>>;

// Get all sacrament meetings
export async function fetchSacramentMeetings() {
  const { data, error } = await supabase.from(TABLE_NAME).select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Get a sacrament meeting by id
export async function fetchSacramentMeetingById(id: number) {
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

// Insert a new sacrament meeting
export async function postSacramentMeeting(
  newSacramentMeeting: SacramentMeetingInsert
) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(newSacramentMeeting)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// SacramentMeetings bulk insert
export async function postSacramentMeetings(
  newSacramentMeetings: SacramentMeetingInsert[]
) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(newSacramentMeetings);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Update a sacrament meeting
export async function patchSacramentMeeting({
  id,
  ...updatedSacramentMeeting
}: PickAsRequired<Partial<SacramentMeetingUpdate>, "id">) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedSacramentMeeting)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete a sacrament meeting
export async function deleteSacramentMeeting(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
