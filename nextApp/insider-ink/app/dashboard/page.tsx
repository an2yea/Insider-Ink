"use client"

import { Dashboard } from "@/components/dashboard"
import { DashboardProvider } from "@/src/contexts/DashboardContext"

export default function DashboardPage() {
  return <DashboardProvider><Dashboard /></DashboardProvider>
}

