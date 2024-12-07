"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import TabNavigation from "./tab-navigation"
import CreatePost from "./create-post"
import ViewPosts from "./view-posts"
import CompanyPosts from "./company-posts"
import { Button } from "./ui/button"

const tabComponents = [CreatePost, ViewPosts, CompanyPosts]

export function Dashboard() {
  const [activeTab, setActiveTab] = useState(0)
  const router = useRouter()

  const handleLogout = () => {
    console.log("Logging out")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold text-primary mb-8"> Insider Ink </h1>
      <Button onClick={handleLogout}>Logout</Button>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {tabComponents.map((Component, index) => (
            activeTab === index && <Component key={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

