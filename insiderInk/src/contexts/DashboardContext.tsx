"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import { User } from "@/app/types/user"
import { Company } from "@/app/types/company"

interface DashboardContextType {
  user: User | null
  setUser: (user: User | null) => void
  selectedCompanyId: string | null
  setSelectedCompanyId: (companyId: string | null) => void
  activeTab: number
  setActiveTab: (tab: number) => void
  userId: string | null
  setUserId: (userId: string | null) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)
  return (
    <DashboardContext.Provider value={{ user, setUser, selectedCompanyId, setSelectedCompanyId, activeTab, setActiveTab, userId, setUserId }}>
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
