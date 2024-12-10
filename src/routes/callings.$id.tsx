import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";

import { callingQueryOptions, useUpdateCalling } from "@/api/callings";
import CallingFields from "@/components/CallingFields";

export const Route = createFileRoute("/callings/$id")({
  params: {
    parse: (params) => ({
      id: z.number().int().parse(Number(params.id)),
    }),
    stringify: ({ id }) => ({ id: `${id}` }),
  },
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      callingQueryOptions(opts.params.id)
    ),
  component: CallingComponent,
});

function CallingComponent() {
  const params = Route.useParams();
  const callingQuery = useSuspenseQuery(callingQueryOptions(params.id));
  const calling = callingQuery.data;
  const updateCallingMutation = useUpdateCalling();

  return (
    <form
      key={params.id}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const formData = new FormData(event.target as HTMLFormElement);
        updateCallingMutation.mutate({
          id: calling.id,
          calling: formData.get("calling") as string,
          organizationId: Number(formData.get("organizationId")),
        });
      }}
      className="p-2 space-y-2"
    >
      <CallingFields
        calling={calling}
        disabled={updateCallingMutation.status === "pending"}
      />
      <div>
        <button
          className="bg-blue-500 rounded p-2 uppercase text-white font-black disabled:opacity-50"
          disabled={updateCallingMutation.status === "pending"}
        >
          Save
        </button>
      </div>
      {updateCallingMutation.variables?.id === calling.id ? (
        <div key={updateCallingMutation.submittedAt}>
          {updateCallingMutation.status === "success" ? (
            <div className="inline-block px-2 py-1 rounded bg-green-500 text-white animate-bounce [animation-iteration-count:2.5] [animation-duration:.3s]">
              Saved!
            </div>
          ) : updateCallingMutation.status === "error" ? (
            <div className="inline-block px-2 py-1 rounded bg-red-500 text-white animate-bounce [animation-iteration-count:2.5] [animation-duration:.3s]">
              Failed to save.
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
