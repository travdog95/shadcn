import { queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/main";
import {
  fetchOrganizations,
  fetchOrganizationById,
  postOrganization,
  postOrganizations,
  patchOrganization,
  deleteOrganization,
} from "@/services/organizationsService";
import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";

const QUERY_KEY = "organizations";

type OrganizationInsert = TablesInsert<"organizations">;
type OrganizationUpdate = TablesUpdate<"organizations">;

export const organizationsQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEY],
    queryFn: () => fetchOrganizations(),
  });

export const organizationQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchOrganizationById(id),
  });

export const useCreateOrganization = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create"],
    mutationFn: postOrganization,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useCreateOrganizations = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "create-bulk"],
    mutationFn: (organizations: OrganizationInsert[]) =>
      postOrganizations(organizations),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useUpdateOrganization = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, "update"],
    mutationFn: (organization: OrganizationUpdate) => {
      if (organization.id === undefined) {
        throw new Error("Organization id is required");
      }
      return patchOrganization({ ...organization, id: organization.id! });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeleteOrganization = () => {
  return useMutation({
    mutationFn: deleteOrganization,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
