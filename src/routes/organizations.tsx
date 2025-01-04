import { useEffect, useState } from "react";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { RowSelectedEvent, ColDef, GridOptions } from "ag-grid-community";

import { organizationsQueryOptions } from "@/api/organizations";

export const Route = createFileRoute("/organizations")({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(organizationsQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  const organizationsQuery = useSuspenseQuery(organizationsQueryOptions());
  const organizations = organizationsQuery.data;

  const [rowData, setRowData] = useState(organizations);
  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: "id", flex: 1 },
    {
      field: "name",
      headerName: "Organization",
      flex: 3,
      filter: true,
      floatingFilter: true,
      editable: true,
    },
  ]);

  const navigate = useNavigate();

  const onRowSelected = (event: RowSelectedEvent<any>) => {
    if (event.node.isSelected()) {
      const id = event.node.data.id;
      navigate({ to: `/organizations/${id}`, params: { id } });
    }
  };

  useEffect(() => {
    setRowData(organizations);
  }, [organizations]);

  const defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
  };

  const gridOptions: GridOptions = {
    // rowHeight: 35,
    multiSortKey: "ctrl",
    rowSelection: {
      mode: "singleRow",
      checkboxes: false,
      enableClickSelection: true,
    },
  };

  return (
    <div className="flex-1 flex">
      <div className="ag-theme-alpine " style={{ height: 400, width: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          gridOptions={gridOptions}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={50}
          paginationPageSizeSelector={[50, 100, 200]}
          onRowSelected={onRowSelected}
        ></AgGridReact>
      </div>
      <div className="flex-1 border-l">
        <Outlet />
      </div>
    </div>
  );
}
