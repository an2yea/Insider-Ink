"use client"

import Image from "next/image";
import { redirect } from "next/navigation";
import { useDashboardContext } from "@/src/contexts/DashboardContext";

export default function Home() {
  const { user } = useDashboardContext()
  if (user) {
    redirect("/dashboard")
  } else {
    redirect("/login")
  }
}
