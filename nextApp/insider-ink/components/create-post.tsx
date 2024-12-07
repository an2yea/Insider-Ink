"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function CreatePost() {
  const [text, setText] = useState("")
  const [media, setMedia] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle post submission here
    console.log("Submitting post:", { text, media })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="post-text">Post Content</Label>
          <Textarea
            id="post-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="post-media">Upload Media</Label>
          <Input
            id="post-media"
            type="file"
            onChange={(e) => setMedia(e.target.files?.[0] || null)}
            className="mt-1"
          />
        </div>
        <div>
          <Label>Company Tag</Label>
          <p className="text-muted-foreground">Company XYZ</p>
        </div>
        <Button type="submit" className="w-full">Create Post</Button>
      </form>
    </motion.div>
  )
}

export default CreatePost