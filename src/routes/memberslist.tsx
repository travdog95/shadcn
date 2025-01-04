import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridOptions, RowSelectedEvent } from "ag-grid-community";

import { membersQueryOptions } from "@/api/members";
import {
  calculateAge,
  formatDate,
  normalizePhoneNumber,
} from "@/utils/helpers";
import Note from "@/components/Note";

export const Route = createFileRoute("/memberslist")({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(membersQueryOptions()),
  component: MembersListComponent,
});

const onRowSelected = (event: RowSelectedEvent<any>) => {
  if (event.node.isSelected()) {
    const id = event.node.data.id;
    // navigate({ to: `/organizations/${id}`, params: { id } });
    console.log("selected row id: ", id);
  }
};

function MembersListComponent() {
  const membersQuery = useSuspenseQuery(membersQueryOptions());
  const members = membersQuery.data;

  const [rowData, setRowData] = useState(members);
  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      field: "preferredName",
      headerName: "Preferred Name",
      width: 250,
      sort: "asc",
      sortIndex: 0,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
    },
    {
      field: "birthDate",
      headerName: "Age",
      width: 100,
      valueFormatter: (params) => {
        return calculateAge(params.value)?.toString() || "";
      },
    },
    {
      field: "birthDate",
      headerName: "Birthday",
      width: 100,
      // format as birth day ( month and day only)
      valueFormatter: (params) => {
        return formatDate(params.value, "LLL d") || "";
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      valueFormatter: (params) => {
        return normalizePhoneNumber(params.value) || "";
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "note",
      headerName: "Note",
      width: 75,
      cellRenderer: () => <button>Note</button>,
    },
  ]);

  const defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
  };

  const gridOptions: GridOptions = {
    rowHeight: 35,
    multiSortKey: "ctrl",
    // rowSelection: {
    //   mode: "singleRow",
    //   checkboxes: false,
    //   enableClickSelection: true,
    // },
  };

  return (
    <div className="flex-1 flex">
      <Note />
      {/* <div className="ag-theme-alpine w-full" style={{ height: 700 }}>
        <AgGridReact
          rowData={rowData}
          gridOptions={gridOptions}
          defaultColDef={defaultColDef}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={50}
          paginationPageSizeSelector={[50, 100, 200]}
          // onRowSelected={onRowSelected}
          // components={{ noteRenderer: Note }}
        ></AgGridReact>
      </div> */}
    </div>
  );
}
