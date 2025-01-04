import { queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/main";
import {
  fetchMemberCallings,
  fetchMemberCallingById,
  postMemberCalling,
  postMemberCallings,
  patchMemberCalling,
  deleteMemberCalling,
} from "@/services/memberCallingsService";
import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";

const QUERY_KEY = "membercallings";

type MemberCallingInsert = TablesInsert<"membercallings">;
type MemberCallingUpdate = TablesUpdate<"membercallings">;

export const memberCallingsQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEY],
    queryFn: fetchMemberCallings,
  });

export const memberCallingQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchMemberCallingById(id),
  });

export const useCreateMemberCalling = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create"],
    mutationFn: postMemberCalling,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useCreateMemberCallings = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create-bulk"],
    mutationFn: (memberCallings: MemberCallingInsert[]) => postMemberCallings(memberCallings),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useUpdateMemberCalling = () => {
  return useMutation({
    // mutationKey: [QUERY_KEY, "update"],
    mutationFn: (memberCalling: MemberCallingUpdate) => {
      if (memberCalling.id === undefined) {
        throw new Error("MemberCalling id is required");
      }
      return patchMemberCalling({ ...memberCalling, id: memberCalling.id! });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeleteMemberCalling = () => {
  return useMutation({
    mutationFn: deleteMemberCalling,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
