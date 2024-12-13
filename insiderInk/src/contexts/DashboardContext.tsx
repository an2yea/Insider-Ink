"use client"

import { Company } from "@/app/types/company"
import { Post } from "@/app/types/posts"
import { User } from "@/app/types/user"
import { createContext, ReactNode, useContext, useState } from "react"

type StatusType = 'loading' | 'success' | 'failure'

interface DashboardContextType {
  user: User | null
  setUser: (user: User | null) => void
  selectedCompanyId: string | null
  setSelectedCompanyId: (companyId: string | null) => void
  activeTab: number
  setActiveTab: (tab: number) => void
  userId: string | null
  setUserId: (userId: string | null) => void
  companies: Company[]
  setCompanies: (companies: Company[]) => void
  posts: Post[]
  setPosts: (posts: Post[]) => void
  isStatusOpen: boolean
  setIsStatusOpen: (isStatusOpen: boolean) => void
  statusMessage: string
  setStatusMessage: (statusMessage: string) => void
  timeout?: number | undefined
  setTimeout: (timeout: number | undefined) => void
  statusType: StatusType
  setStatusType: (statusType: StatusType) => void
  statusLoading: (message: string) => void
  statusSuccessful: (message: string) => void
  statusFailure: (message: string) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)   
  const [companies, setCompanies] = useState<Company[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string>("")
  const [timeout, setTimeout] = useState<number | undefined>(undefined)
  const [statusType, setStatusType] = useState<StatusType>('loading')
  
  const statusLoading = (message: string) => {
    setStatusType('loading')
    setIsStatusOpen(true)
    setStatusMessage(message)
    setTimeout(undefined)
  }


  const statusSuccessful= (message: string) => {
    setStatusType("success")
    setIsStatusOpen(true)
    setStatusMessage(message)
    setTimeout(4000)
  }

  const statusFailure = (message: string) => {
    setStatusType("failure")
    setIsStatusOpen(true)
    setStatusMessage(message)
    setTimeout(4000)
  }
  
  return (
    <DashboardContext.Provider value={{ user, setUser, selectedCompanyId, setSelectedCompanyId, activeTab, setActiveTab, userId, setUserId, companies, setCompanies, posts, setPosts, statusFailure, statusSuccessful,setTimeout ,isStatusOpen, setIsStatusOpen, statusMessage, setStatusMessage, setStatusType, statusType, statusLoading, timeout}}>
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
