"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import { User } from "@/app/types/user"

interface DashboardContextType {
  user: User | null
  setUser: (user: User | null) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  return (
    <DashboardContext.Provider value={{ user, setUser }}>
      {children}
    </DashboardContext.Provider>
  )
}


export const useDashboardContext = () => {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error('useDashboardContext must be used within a DashboardProvider')
  }
  return context
}
