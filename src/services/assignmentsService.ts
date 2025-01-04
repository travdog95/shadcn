import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";
import { supabase } from "@/lib/supabase";

const TABLE_NAME = "assignments";

type AssignmentInsert = TablesInsert<"assignments">;
type AssignmentUpdate = TablesUpdate<"assignments">;

type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<TValue, TKey> &
  Required<Pick<TValue, TKey>>;

// Get all assignments
export async function fetchAssignments() {
  const { data, error } = await supabase.from(TABLE_NAME).select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Get a assignment by id
export async function fetchAssignmentById(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).select().eq("id", id).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Insert a new assignment
export async function postAssignment(newAssignment: AssignmentInsert) {
  const { data, error } = await supabase.from(TABLE_NAME).insert(newAssignment).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Assignments bulk insert
export async function postAssignments(newAssignments: AssignmentInsert[]) {
  const { data, error } = await supabase.from(TABLE_NAME).insert(newAssignments);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Update a assignment
export async function patchAssignment({
  id,
  ...updatedAssignment
}: PickAsRequired<Partial<AssignmentUpdate>, "id">) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedAssignment)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete a assignment
export async function deleteAssignment(id: number) {
  const { data, error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
