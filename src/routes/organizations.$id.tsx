import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";

import {
  organizationQueryOptions,
  useUpdateOrganization,
  useDeleteOrganization,
} from "@/api/organizations";
import OrganizationFields from "@/components/OrganizationFields";

export const Route = createFileRoute("/organizations/$id")({
  params: {
    parse: (params) => ({
      id: z.number().int().parse(Number(params.id)),
    }),
    stringify: ({ id }) => ({ id: `${id}` }),
  },
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      organizationQueryOptions(opts.params.id)
    ),
  component: OrganizationComponent,
});

function OrganizationComponent() {
  const params = Route.useParams();
  const navigate = useNavigate();
  const organizationQuery = useSuspenseQuery(
    organizationQueryOptions(params.id)
  );
  const organization = organizationQuery.data;
  const updateOrganization = useUpdateOrganization();
  const deleteOrganization = useDeleteOrganization();

  return (
    <form
      key={params.id}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const formData = new FormData(event.target as HTMLFormElement);
        updateOrganization.mutate({
          id: organization.id,
          name: formData.get("name") as string,
        });
      }}
      className="p-2 space-y-2"
    >
      <OrganizationFields
        organization={organization}
        disabled={updateOrganization.status === "pending"}
      />
      <div className="flex gap-2">
        <button
          className="bg-blue-500 rounded p-2 uppercase text-white font-black disabled:opacity-50"
          disabled={updateOrganization.status === "pending"}
        >
          Save
        </button>
        <button
          className="bg-red-500 rounded p-2 uppercase text-white font-black disabled:opacity-50"
          disabled={updateOrganization.status === "pending"}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            deleteOrganization.mutate(organization.id, {
              onSuccess: () => {
                // Redirect to the organizations list
                navigate({ to: "/organizations" });
              },
            });
          }}
        >
          Delete
        </button>
      </div>
      {updateOrganization.variables?.id === organization.id ? (
        <div key={updateOrganization.submittedAt}>
          {updateOrganization.status === "success" ? (
            <div className="inline-block px-2 py-1 rounded bg-green-500 text-white animate-bounce [animation-iteration-count:2.5] [animation-duration:.3s]">
              Saved!
            </div>
          ) : updateOrganization.status === "error" ? (
            <div className="inline-block px-2 py-1 rounded bg-red-500 text-white animate-bounce [animation-iteration-count:2.5] [animation-duration:.3s]">
              Failed to save.
            </div>
          ) : null}
        </div>
      ) : null}
      <div key={deleteOrganization.submittedAt}>
        {deleteOrganization.status === "success" ? (
          <div className="inline-block px-2 py-1 rounded bg-green-500 text-white animate-bounce [animation-iteration-count:2.5] [animation-duration:.3s]">
            Deleted!
          </div>
        ) : deleteOrganization.status === "error" ? (
          <div className="inline-block px-2 py-1 rounded bg-red-500 text-white animate-bounce [animation-iteration-count:2.5] [animation-duration:.3s]">
            Failed to delete.
          </div>
        ) : null}
      </div>
    </form>
  );
}
