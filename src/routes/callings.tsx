import {
  Link,
  MatchRoute,
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Spinner } from "@/components/Spinner";
import { callingsQueryOptions } from "@/api/callings";
import { Tables } from "@/utils/supabase.types";
import { useState } from "react";

export const Route = createFileRoute("/callings")({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(callingsQueryOptions()),
  component: CallingsComponent,
});

type Calling = Tables<"callings">;

function CallingsComponent() {
  const callingsQuery = useSuspenseQuery(callingsQueryOptions());
  const callings = callingsQuery.data;
  const defaultData: Calling[] = callings;
  const columnHelper = createColumnHelper<Calling>();
  const columns = [
    // Accessor Column
    columnHelper.accessor("id", {
      cell: (info) => {
        const id = info.getValue();
        return (
          <div key={id}>
            <Link
              to="/callings/$id"
              params={{
                id: id,
              }}
              preload="intent"
              className="block py-2 px-3 text-blue-700"
              activeProps={{ className: `font-bold` }}
            >
              {info.getValue()}
              <MatchRoute
                to="/callings/$id"
                params={{
                  id: info.getValue(),
                }}
                pending
              >
                {(match) => <Spinner show={!!match} wait="delay-50" />}
              </MatchRoute>
            </Link>
          </div>
        );
      },
    }),
    // Accessor Column
    columnHelper.accessor("calling", {
      cell: (info) => {
        return (
          <div onClick={() => console.log("click")}>{info.getValue()} </div>
        );
      },
    }),
    // Accessor Column
    columnHelper.accessor("organization", {
      cell: (info) => info.getValue(),
    }),
    // Accessor Column
    columnHelper.accessor("organizationId", {
      cell: (info) => info.getValue(),
    }),
    // Accessor Column
    columnHelper.accessor((row) => row.mdID, {
      id: "mdID",
      cell: (info) => info.getValue(),
      header: () => <span>MD ID</span>,
    }),
  ];

  const [data, _setData] = useState(() => [...defaultData]);
  // const rerender = useReducer(() => ({}), {})[1];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="flex-1 flex">
      <div className="divide-y w-200">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-1 border-l">
        <Outlet />
      </div>
    </div>
  );
}
