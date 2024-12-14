"use client"

import { CreateAccountForm } from "@/components/CreateAccount"
import { useDashboardContext } from "@/src/contexts/DashboardContext"
import { useEffect } from "react"
import { Company } from "../types/company"

export default function CreateAccountPage() { 
  const { setCompanies } = useDashboardContext()

  useEffect(() => {
    const fetchCompanies = async () => {
      const companiesData = await fetch("/api/companies/get")
      const companiesObject = await companiesData.json() as Company[]
      console.log("Companies:", companiesObject)
      setCompanies(companiesObject) // set the companies in the dashboard context
    }
    fetchCompanies()
  }, [])
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <CreateAccountForm />
    </div>
  )
}

