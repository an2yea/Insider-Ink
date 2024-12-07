"use client"

import { motion } from "framer-motion"
import { PostCard } from "./post-card"

const dummyPosts = [
  { id: 1, author: "User1", content: "This is a sample post", likes: 5 },
  { id: 2, author: "User2", content: "Another sample post", likes: 10 },
  { id: 3, author: "User3", content: "Yet another sample post", likes: 3 },
]

function ViewPosts() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">View Posts</h2>
      <div className="space-y-4">
        {dummyPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </motion.div>
  )
}

export default ViewPosts