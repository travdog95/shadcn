import { queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/main";
import {
  fetchUsers,
  fetchUserById,
  postUser,
  postUsers,
  patchUser,
  deleteUser,
} from "@/services/usersService";
import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";

const QUERY_KEY = "users";

type UserInsert = TablesInsert<"users">;
type UserUpdate = TablesUpdate<"users">;

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEY],
    queryFn: fetchUsers,
  });

export const callingQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchUserById(id),
  });

export const useCreateUser = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create"],
    mutationFn: postUser,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const useCreateUsers = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create-bulk"],
    mutationFn: (users: UserInsert[]) => postUsers(users),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useUpdateUser = () => {
  return useMutation({
    // mutationKey: [QUERY_KEY, "update"],
    mutationFn: (calling: UserUpdate) => {
      if (calling.id === undefined) {
        throw new Error("User id is required");
      }
      return patchUser({ ...calling, id: calling.id! });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
