import { queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/main";
import {
  fetchTalks,
  fetchTalkById,
  postTalk,
  postTalks,
  patchTalk,
  deleteTalk,
} from "@/services/talksService";
import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";

const QUERY_KEY = "talks";

type TalkInsert = TablesInsert<"talks">;
type TalkUpdate = TablesUpdate<"talks">;

export const talksQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEY],
    queryFn: fetchTalks,
  });

export const talkQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchTalkById(id),
  });

export const useCreateTalk = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create"],
    mutationFn: postTalk,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useCreateTalks = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create-bulk"],
    mutationFn: (talks: TalkInsert[]) => postTalks(talks),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useUpdateTalk = () => {
  return useMutation({
    // mutationKey: [QUERY_KEY, "update"],
    mutationFn: (talk: TalkUpdate) => {
      if (talk.id === undefined) {
        throw new Error("Talk id is required");
      }
      return patchTalk({ ...talk, id: talk.id! });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeleteTalk = () => {
  return useMutation({
    mutationFn: deleteTalk,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
