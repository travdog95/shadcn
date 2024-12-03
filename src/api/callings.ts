import axios from "axios";
import { queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/main";
import {
  fetchCallings,
  postCalling,
  postCallings,
} from "@/services/callingsService";
import { TablesInsert } from "@/utils/supabase.types";

const BASE_URL = "http://localhost:5000/api";
type CallingInsert = TablesInsert<"callings">;

export const callingsQueryOptions = () =>
  queryOptions({
    queryKey: ["callings"],
    queryFn: () => fetchCallings(),
  });

export const useCreateCalling = () => {
  return useMutation({
    mutationKey: ["callings", "create"],
    mutationFn: postCalling,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["callings"] }),
  });
};

export const useCreateCallings = () => {
  return useMutation({
    mutationKey: ["callings", "create-bulk"],
    mutationFn: (callings: CallingInsert[]) => postCallings(callings),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["callings"] }),
  });
};

export const mdGetCallings = () =>
  queryOptions({
    queryKey: ["md-callings"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/callings`);
      return response.data;
    },
  });
