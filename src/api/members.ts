import { queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/main";
import {
  fetchMembers,
  fetchMemberById,
  postMember,
  postMembers,
  patchMember,
  deleteMember,
} from "@/services/membersService";
import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";

const QUERY_KEY = "members";

type MemberInsert = TablesInsert<"members">;
type MemberUpdate = TablesUpdate<"members">;

export const membersQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEY],
    queryFn: fetchMembers,
  });

export const callingQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchMemberById(id),
  });

export const useCreateMember = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create"],
    mutationFn: postMember,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const useCreateMembers = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create-bulk"],
    mutationFn: (members: MemberInsert[]) => postMembers(members),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useUpdateMember = () => {
  return useMutation({
    // mutationKey: [QUERY_KEY, "update"],
    mutationFn: (calling: MemberUpdate) => {
      if (calling.id === undefined) {
        throw new Error("Member id is required");
      }
      return patchMember({ ...calling, id: calling.id! });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeleteMember = () => {
  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
