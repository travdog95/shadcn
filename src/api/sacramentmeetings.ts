import { queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/main";
import {
  fetchSacramentMeetings,
  fetchSacramentMeetingById,
  postSacramentMeeting,
  postSacramentMeetings,
  patchSacramentMeeting,
  deleteSacramentMeeting,
} from "@/services/sacramentMeetingsService";
import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";

const QUERY_KEY = "sacramentmeetings";

type SacramentMeetingInsert = TablesInsert<"sacramentmeetings">;
type SacramentMeetingUpdate = TablesUpdate<"sacramentmeetings">;

export const sacramentMeetingsQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEY],
    queryFn: fetchSacramentMeetings,
  });

export const callingQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchSacramentMeetingById(id),
  });

export const useCreateSacramentMeeting = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create"],
    mutationFn: postSacramentMeeting,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const useCreateSacramentMeetings = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create-bulk"],
    mutationFn: (sacramentMeetings: SacramentMeetingInsert[]) =>
      postSacramentMeetings(sacramentMeetings),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useUpdateSacramentMeeting = () => {
  return useMutation({
    // mutationKey: [QUERY_KEY, "update"],
    mutationFn: (calling: SacramentMeetingUpdate) => {
      if (calling.id === undefined) {
        throw new Error("SacramentMeeting id is required");
      }
      return patchSacramentMeeting({ ...calling, id: calling.id! });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeleteSacramentMeeting = () => {
  return useMutation({
    mutationFn: deleteSacramentMeeting,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
