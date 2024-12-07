"use client"

import { LoginForm } from "@/components/login-form"
import { DashboardProvider } from "@/src/contexts/DashboardContext"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <LoginForm />
    </div>
  )
}
