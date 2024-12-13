"use client"

import { LoadingDialog } from "@/components/loading-dialog"
import { LoginForm } from "@/components/login-form"
import { useDashboardContext } from "@/src/contexts/DashboardContext"

export default function LoginPage() {
  const {loading, loadingMessage} = useDashboardContext()
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <LoadingDialog isOpen={loading} loadingMessage={loadingMessage} />
        <LoginForm />
    </div>
  )
}
