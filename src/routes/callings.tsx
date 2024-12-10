import { useState, useMemo, useEffect } from "react";
import {
  Link,
  MatchRoute,
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";

import { Spinner } from "@/components/Spinner";
import DebouncedInput from "@/components/DebouncedInput";
import { callingsQueryOptions } from "@/api/callings";
import { organizationsQueryOptions } from "@/api/organizations";
import { Tables } from "@/utils/supabase.types";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "select";
  }
}

export const Route = createFileRoute("/callings")({
  loader: async (opts) => {
    const queryClient = opts.context.queryClient;
    await Promise.all([
      queryClient.ensureQueryData(callingsQueryOptions()),
      queryClient.ensureQueryData(organizationsQueryOptions()),
    ]);
  },
  component: CallingsComponent,
});

type Calling = Tables<"callings">;

function CallingsComponent() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const callingsQuery = useSuspenseQuery(callingsQueryOptions());
  const callings = callingsQuery.data;

  const organizationsQuery = useSuspenseQuery(organizationsQueryOptions());
  const organizations = organizationsQuery.data;

  const columnHelper = createColumnHelper<Calling>();

  const columns = useMemo<ColumnDef<Calling, any>[]>(
    () => [
      // Accessor Column - Calling
      columnHelper.accessor("calling", {
        header: "Calling",
        cell: (info) => {
          const id = info.row.original.id;
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
      // Accessor Column - Organization
      columnHelper.accessor("organizationId", {
        header: "Organization",
        cell: (info) => {
          const organization = organizations.find(
            (org) => org.id === info.getValue()
          );
          return organization ? organization.name : "Unassigned";
        },
        filterFn: (row, columnId, filterValue) => {
          return (
            parseInt(row.getValue(columnId)) === parseInt(filterValue) ||
            (row.getValue(columnId) === null && filterValue === "0")
          );
        },
        meta: {
          filterVariant: "select",
        },
      }),
    ],
    []
  );

  const [data, setData] = useState<Calling[]>(() => callings);
  const refreshData = () => setData((_old) => callings);

  // Refresh data when callings change
  useEffect(() => {
    refreshData();
  }, [callings]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <div className="flex-1 flex">
      <div className="divide-y w-200">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <FilterFaceted
                              column={header.column}
                              organizations={organizations}
                            />
                          </div>
                        ) : null}
                      </>
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
        <div className="h-2" />
        <div className="flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              min="1"
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
        <div>
          <button onClick={() => refreshData()}>Refresh Data</button>
        </div>
        <pre>
          {JSON.stringify(
            { columnFilters: table.getState().columnFilters },
            null,
            2
          )}
        </pre>
      </div>
      <div className="flex-1 border-l">
        <Outlet />
      </div>
    </div>
  );
}

function FilterFaceted({
  column,
  organizations,
}: {
  column: Column<any, unknown>;
  organizations: Array<{ id: number; name: string | null }>;
}) {
  const { filterVariant } = column.columnDef.meta ?? {};

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
    [column.getFacetedUniqueValues(), filterVariant]
  );

  return filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      <option value="">All</option>
      {column.id === "organizationId"
        ? organizations.map((org) => (
            <option value={org.id} key={org.id}>
              {org.name}
            </option>
          ))
        : sortedUniqueValues.map((value) => (
            //dynamically generated select options from faceted values feature
            <option value={value} key={value}>
              {value}
            </option>
          ))}
      {column.id === "organizationId" && <option value="0">Unassigned</option>}
    </select>
  ) : (
    <>
      {/* Autocomplete suggestions from faceted values feature */}
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}
