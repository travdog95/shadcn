import { queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/main";
import {
  fetchAssignments,
  fetchAssignmentById,
  postAssignment,
  postAssignments,
  patchAssignment,
  deleteAssignment,
} from "@/services/assignmentsService";
import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";

const QUERY_KEY = "assignments";

type AssignmentInsert = TablesInsert<"assignments">;
type AssignmentUpdate = TablesUpdate<"assignments">;

export const assignmentsQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEY],
    queryFn: fetchAssignments,
  });

export const assignmentQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchAssignmentById(id),
  });

export const useCreateAssignment = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create"],
    mutationFn: postAssignment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useCreateAssignments = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create-bulk"],
    mutationFn: (assignments: AssignmentInsert[]) => postAssignments(assignments),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useUpdateAssignment = () => {
  return useMutation({
    // mutationKey: [QUERY_KEY, "update"],
    mutationFn: (assignment: AssignmentUpdate) => {
      if (assignment.id === undefined) {
        throw new Error("Assignment id is required");
      }
      return patchAssignment({ ...assignment, id: assignment.id! });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeleteAssignment = () => {
  return useMutation({
    mutationFn: deleteAssignment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
