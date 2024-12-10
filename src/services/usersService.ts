import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";
import { supabase } from "@/lib/supabase";

const TABLE_NAME = "users";

type UserInsert = TablesInsert<"users">;
type UserUpdate = TablesUpdate<"users">;
type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<TValue, TKey> &
  Required<Pick<TValue, TKey>>;

// Get all users
export async function fetchUsers() {
  const { data, error } = await supabase.from(TABLE_NAME).select().order("id");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Get a user by id
export async function fetchUserById(id: number) {
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

// Insert a new user
export async function postUser(newUser: UserInsert) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(newUser)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Users bulk insert
export async function postUsers(newUsers: UserInsert[]) {
  const { data, error } = await supabase.from(TABLE_NAME).insert(newUsers);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Update a user
export async function patchUser({
  id,
  ...updatedUser
}: PickAsRequired<Partial<UserUpdate>, "id">) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedUser)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete a user
export async function deleteUser(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
