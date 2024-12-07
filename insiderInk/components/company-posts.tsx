"use client"

import { motion } from "framer-motion"
import { CompanyCard } from "./company-card"
import { PostCard } from "./post-card"

const companyInfo = {
  name: "Company XYZ",
  score: 8.5,
  tags: ["Innovative", "Sustainable", "Diverse"],
}

const companyPosts = [
  { id: 1, author: "Employee1", content: "Excited about our new project!", likes: 15 },
  { id: 2, author: "Employee2", content: "Great team building event today!", likes: 20 },
  { id: 3, author: "Employee3", content: "Just launched our new product!", likes: 25 },
]

function CompanyPosts() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Company Posts</h2>
      <CompanyCard company={companyInfo} />
      <div className="mt-8 space-y-4">
        {companyPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </motion.div>
  )
}

export default CompanyPosts