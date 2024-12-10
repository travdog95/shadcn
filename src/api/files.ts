import { queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/main";
import {
  fetchFiles,
  fetchFileById,
  postFile,
  postFiles,
  patchFile,
  deleteFile,
} from "@/services/filesService";
import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";

const QUERY_KEY = "files";

type FileInsert = TablesInsert<"files">;
type FileUpdate = TablesUpdate<"files">;

export const filesQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEY],
    queryFn: fetchFiles,
  });

export const callingQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchFileById(id),
  });

export const useCreateFile = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create"],
    mutationFn: postFile,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const useCreateFiles = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create-bulk"],
    mutationFn: (files: FileInsert[]) => postFiles(files),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useUpdateFile = () => {
  return useMutation({
    // mutationKey: [QUERY_KEY, "update"],
    mutationFn: (calling: FileUpdate) => {
      if (calling.id === undefined) {
        throw new Error("File id is required");
      }
      return patchFile({ ...calling, id: calling.id! });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: deleteFile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
