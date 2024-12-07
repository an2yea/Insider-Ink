"use client"

import { Dashboard } from "@/components/dashboard"
import { useAuth } from "@/src/contexts/AuthContext"
import { useEffect } from "react"
import { useDashboardContext } from "@/src/contexts/DashboardContext"
import { useRouter } from "next/navigation"
import { User } from "../types/user"

export default function DashboardPage() {

  const { user: firebaseUser}  = useAuth()
  const {setUser, setUserId} = useDashboardContext()
  const router = useRouter()

  useEffect(() => {
    if (!firebaseUser?.uid) {
      router.push("/login")
    }
    setUserId(firebaseUser?.uid || null)
    const fetchUser = async () => {
      const userData = await fetch(`/api/users/${firebaseUser?.uid}`)
      const userObject = await userData.json() as User
      setUser(userObject) // set the user in the dashboard context
    }
    fetchUser()
  }, [firebaseUser])
  return <Dashboard />
}

