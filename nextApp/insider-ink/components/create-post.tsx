"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDashboardContext } from "@/src/contexts/DashboardContext"

function CreatePost() {
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
  const [media, setMedia] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useDashboardContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('text', text)
      formData.append('companyId', user?.companyId || '')
      formData.append('authorId', user?.id || '')
      if (media) {
        formData.append('media', media)
      }

      const response = await fetch('/api/posts/create', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      // Reset form
      setTitle('')
      setText('')
      setMedia(null)
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsLoading(false)
    }
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
          <Label htmlFor="post-title">Post Title</Label>
          <Input
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="mt-1"
          />
        </div>
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Post'}
        </Button>
      </form>
    </motion.div>
  )
}

export default CreatePost