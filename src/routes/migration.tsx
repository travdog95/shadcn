import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/migration")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="flex items-center border-b">
        <h2 className="text-xl p-2">Migration</h2>
      </div>
      <div className="flex flex-wrap divide-x">
        {(
          [
            ["/migration/members", "Members", true],
            ["/migration/callings", "Callings"],
            ["/migration/sacramentmeetings", "Sacrament Meetings"],
            ["/migration/users", "Users"],
            ["/migration/files", "Files"],
            ["/migration/membercallings", "Member Callings"],
            ["/migration/assignments", "Assignments"],
            ["/migration/callingworkshopitems", "Calling Workshop"],
            ["/migration/prayers", "Prayers"],
            ["/migration/talks", "Talks"],
          ] as const
        ).map(([to, label, exact]) => {
          return (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact }}
              activeProps={{ className: `font-bold` }}
              className="p-2"
            >
              {label}
            </Link>
          );
        })}
      </div>
      <hr />
      <Outlet />
    </>
  );
}
