"use client"

import Image from "next/image";
import { redirect } from "next/navigation";
import { useDashboardContext } from "@/src/contexts/DashboardContext";
import { LandingPage } from "@/components/landing-page";

export default function Home() {
  return <LandingPage />
}
