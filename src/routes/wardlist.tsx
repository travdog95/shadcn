import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wardlist')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /wardlist!'
}
