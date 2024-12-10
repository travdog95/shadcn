import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";
import { supabase } from "@/lib/supabase";

const TABLE_NAME = "files";

type FileInsert = TablesInsert<"files">;
type FileUpdate = TablesUpdate<"files">;
type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<TValue, TKey> &
  Required<Pick<TValue, TKey>>;

// Get all files
export async function fetchFiles() {
  const { data, error } = await supabase.from(TABLE_NAME).select().order("id");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Get a file by id
export async function fetchFileById(id: number) {
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

// Insert a new file
export async function postFile(newFile: FileInsert) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(newFile)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Files bulk insert
export async function postFiles(newFiles: FileInsert[]) {
  const { data, error } = await supabase.from(TABLE_NAME).insert(newFiles);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Update a file
export async function patchFile({
  id,
  ...updatedFile
}: PickAsRequired<Partial<FileUpdate>, "id">) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedFile)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete a file
export async function deleteFile(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
