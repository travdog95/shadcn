import axios from "axios";
import { queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/main";
import { fetchMembers, postMember } from "@/services/membersService";

const BASE_URL = "http://localhost:5000/api";

export const membersQueryOptions = () =>
  queryOptions({
    queryKey: ["members"],
    queryFn: () => fetchMembers(),
  });

export const useCreateMember = () => {
  return useMutation({
    mutationKey: ["members", "create"],
    mutationFn: postMember,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const mdGetMembers = () =>
  queryOptions({
    queryKey: ["md-members"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/members`);
      return response.data.data;
    },
  });
