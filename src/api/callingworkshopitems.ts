import { queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/main";
import {
  fetchCallingWorkshopItems,
  fetchCallingWorkshopItemById,
  postCallingWorkshopItem,
  postCallingWorkshopItems,
  patchCallingWorkshopItem,
  deleteCallingWorkshopItem,
} from "@/services/callingWorkshopItemsService";
import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";

const QUERY_KEY = "callingworkshopitems";

type CallingWorkshopItemsInsert = TablesInsert<"callingworkshopitems">;
type CallingWorkshopItemsUpdate = TablesUpdate<"callingworkshopitems">;

export const callingWorkshopItemsQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEY],
    queryFn: fetchCallingWorkshopItems,
  });

export const callingWorkshopItemQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchCallingWorkshopItemById(id),
  });

export const useCreateCallingWorkshopItem = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create"],
    mutationFn: postCallingWorkshopItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useCreateCallingWorkshopItems = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create-bulk"],
    mutationFn: (callingWorkshopItems: CallingWorkshopItemsInsert[]) =>
      postCallingWorkshopItems(callingWorkshopItems),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useUpdateCallingWorkshopItem = () => {
  return useMutation({
    // mutationKey: [QUERY_KEY, "update"],
    mutationFn: (callingWorkshopItem: CallingWorkshopItemsUpdate) => {
      if (callingWorkshopItem.id === undefined) {
        throw new Error("CallingWorkshopItems id is required");
      }
      return patchCallingWorkshopItem({ ...callingWorkshopItem, id: callingWorkshopItem.id! });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeleteCallingWorkshopItem = () => {
  return useMutation({
    mutationFn: deleteCallingWorkshopItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
