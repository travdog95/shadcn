import { queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/main";
import {
  fetchPrayers,
  fetchPrayerById,
  postPrayer,
  postPrayers,
  patchPrayer,
  deletePrayer,
} from "@/services/prayersService";
import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";

const QUERY_KEY = "prayers";

type PrayerInsert = TablesInsert<"prayers">;
type PrayerUpdate = TablesUpdate<"prayers">;

export const prayersQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEY],
    queryFn: fetchPrayers,
  });

export const prayerQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchPrayerById(id),
  });

export const useCreatePrayer = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create"],
    mutationFn: postPrayer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useCreatePrayers = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create-bulk"],
    mutationFn: (prayers: PrayerInsert[]) => postPrayers(prayers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useUpdatePrayer = () => {
  return useMutation({
    // mutationKey: [QUERY_KEY, "update"],
    mutationFn: (prayer: PrayerUpdate) => {
      if (prayer.id === undefined) {
        throw new Error("Prayer id is required");
      }
      return patchPrayer({ ...prayer, id: prayer.id! });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeletePrayer = () => {
  return useMutation({
    mutationFn: deletePrayer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
