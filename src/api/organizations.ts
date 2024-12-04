import { queryOptions, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/main";
import {
  fetchOrganizations,
  fetchOrganizationById,
  postOrganization,
  postOrganizations,
  patchOrganization,
} from "@/services/organizationsService";
import { TablesInsert, TablesUpdate } from "@/utils/supabase.types";

type OrganizationInsert = TablesInsert<"organizations">;
type OrganizationUpdate = TablesUpdate<"organizations">;

export const organizationsQueryOptions = () =>
  queryOptions({
    queryKey: ["organizations"],
    queryFn: () => fetchOrganizations(),
  });

export const organizationQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["organizations", id],
    queryFn: () => fetchOrganizationById(id),
  });

export const useCreateOrganization = () => {
  return useMutation({
    mutationKey: ["organizations", "create"],
    mutationFn: postOrganization,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["organizations"] }),
  });
};

export const useCreateOrganizations = () => {
  return useMutation({
    mutationKey: ["organizations", "create-bulk"],
    mutationFn: (organizations: OrganizationInsert[]) =>
      postOrganizations(organizations),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["organizations"] }),
  });
};

export const useUpdateOrganization = () => {
  return useMutation({
    mutationKey: ["organizations", "update"],
    mutationFn: (organization: OrganizationUpdate) => {
      if (organization.id === undefined) {
        throw new Error("Organization id is required");
      }
      return patchOrganization({ ...organization, id: organization.id! });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["organizations"] }),
  });
};
