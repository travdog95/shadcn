import { queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/main";
import {
  fetchCallings,
  fetchCallingById,
  postCalling,
  postCallings,
  patchCalling,
  deleteCalling,
} from "@/services/callingsService";
import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";

const QUERY_KEY = "callings";

type CallingInsert = TablesInsert<"callings">;
type CallingUpdate = TablesUpdate<"callings">;

export const callingsQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEY],
    queryFn: fetchCallings,
  });

export const callingQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchCallingById(id),
  });

export const useCreateCalling = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create"],
    mutationFn: postCalling,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useCreateCallings = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create-bulk"],
    mutationFn: (callings: CallingInsert[]) => postCallings(callings),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useUpdateCalling = () => {
  return useMutation({
    // mutationKey: [QUERY_KEY, "update"],
    mutationFn: (calling: CallingUpdate) => {
      if (calling.id === undefined) {
        throw new Error("Calling id is required");
      }
      return patchCalling({ ...calling, id: calling.id! });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeleteCalling = () => {
  return useMutation({
    mutationFn: deleteCalling,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
