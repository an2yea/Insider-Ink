"use client"

import { useDashboardContext } from "@/src/contexts/DashboardContext"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CompaniesTab } from "./companies-tab"
import { Header } from "./header"
import { PostsTab } from "./posts-tab"
import TabNavigation from "./tab-navigation"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState(0)
  const { user, startLoading } = useDashboardContext()
  const router = useRouter()
  if (!user) {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <Header />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 0 && <PostsTab />}
          {activeTab === 1 && <CompaniesTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


