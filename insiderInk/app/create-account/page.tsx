"use client"

import { CreateAccountForm } from "@/components/CreateAccount"
import { Company } from "../types/company"
import { AnimatePresence } from "framer-motion"
import { useEffect } from "react"
import { useDashboardContext } from "@/src/contexts/DashboardContext"
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast";
import { useState } from "react"
import { X } from "lucide-react"

export default function CreateAccountPage() { 
  const { setCompanies } = useDashboardContext()
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchCompanies = async () => {
      const companiesData = await fetch("/api/companies/get")
      const companiesObject = await companiesData.json() as Company[]
      console.log("Companies:", companiesObject)
      setCompanies(companiesObject) // set the companies in the dashboard context
    }
    fetchCompanies()
  }, [])
  useEffect(() => {
    if (error) {
    const timer = setTimeout(() => {
        setError(null)
      }, 10000)
    return () => clearTimeout(timer)
    }
  }, [error])
  const handleCloseError = () => {
    setError(null)
  }
  return (
    <ToastProvider>
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <CreateAccountForm />
    </div>
    <AnimatePresence>
      {error && (
            <Toast variant="destructive">
              <div className="flex justify-between items-start">
                <div>
                  <ToastTitle>Notification</ToastTitle>
                  <ToastDescription>{error}</ToastDescription>
                </div>
                <ToastClose asChild>
                  <button
                    onClick={handleCloseError}
                    className="rounded-full p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </button>
                </ToastClose>
              </div>
            </Toast>
          )}
      </AnimatePresence>
      <ToastViewport />
    </ToastProvider>
  )
}

