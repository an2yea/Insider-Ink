"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from 'lucide-react'

interface Post {
  id: number
  author: string
  content: string
  likes: number
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [likes, setLikes] = useState(post.likes)

  const handleLike = () => {
    setLikes(likes + 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-bold mb-2">{post.author}</h3>
          <p>{post.content}</p>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" onClick={handleLike}>
            <Heart className="mr-2 h-4 w-4" />
            {likes} Likes
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

