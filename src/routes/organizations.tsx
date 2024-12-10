import { useEffect, useState } from "react";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { RowSelectedEvent, ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { organizationsQueryOptions } from "@/api/organizations";
// import { ColDef } from "node_modules/ag-grid-community/dist/types/core/main";

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

  return (
    <div className="flex-1 flex">
      <div className="ag-theme-alpine " style={{ height: 400, width: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
          // paginationPageSize={15}
          paginationAutoPageSize={true}
          // paginationPageSizeSelector={[15, 30, 60]}
          rowSelection="single"
          onRowSelected={onRowSelected}
        ></AgGridReact>
      </div>
      <div className="flex-1 border-l">
        <Outlet />
      </div>
    </div>
  );
}
