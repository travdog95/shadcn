import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/callings/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /callings/$id!";
}
