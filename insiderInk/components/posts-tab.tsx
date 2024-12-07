"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart } from 'lucide-react'
import { useDashboardContext } from "@/src/contexts/DashboardContext"
import { Label } from "@radix-ui/react-label"


export function PostsTab() {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [media, setMedia] = useState<File | null>(null)
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
    const { selectedCompanyId, setSelectedCompanyId, companies, posts } = useDashboardContext()
    const { user, userId } = useDashboardContext()


    const filteredPosts = selectedCompanyId
        ? posts.filter(post => post.companyId === selectedCompanyId)
        : posts

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault()
        // Handle post creation logic here
        console.log("Creating post:", title, content)
        try {
            const reqData = {
                title,
                content,
                companyId: user?.companyId || '',
                userId: userId || '',
                companyName: user?.companyName || '',
                media: media,
            }
            
            console.log("reqData", reqData)
            const response = await fetch('/api/posts/create', {
                method: 'POST',
                body: JSON.stringify(reqData),
            })
            if (!response.ok) {
                console.error("Failed to create post:", response.statusText)
            }
            setIsCreatePostOpen(false)
            setTitle("")
            setContent("")
            setMedia(null)

        } catch (error) {
            console.error("Error creating post:", error)
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <Button onClick={() => setIsCreatePostOpen(!isCreatePostOpen)}>
                    {isCreatePostOpen ? "Cancel" : "Create Post"}
                </Button>
                <AnimatePresence>
                    {isCreatePostOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="mt-4">
                                <CardHeader>
                                    <CardTitle>Create a New Post</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleCreatePost} className="space-y-4">
                                        <Input
                                            placeholder="Post Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                        <Textarea
                                            placeholder="What's on your mind?"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            required
                                        />
                                        <div>
                                            <Label htmlFor="post-media">Upload Media</Label>
                                            <Input
                                                id="post-media"
                                                type="file"
                                                onChange={(e) => setMedia(e.target.files?.[0] || null)}
                                                className="mt-1"
                                            />
                                        </div>
                                        <Button type="submit">Post</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>


            </div>
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <Select value={selectedCompanyId || ""} onValueChange={(value) => setSelectedCompanyId(value || null)}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Filter by company" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Companies</SelectItem>
                            {companies.map((company) => (
                                <SelectItem key={company.id} value={company.id}>
                                    {company.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {selectedCompanyId && (
                        <Button variant="outline" onClick={() => setSelectedCompanyId(null)}>
                            Clear Filter
                        </Button>
                    )}
                </div>
                {filteredPosts.map((post, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{post.companyName} • {new Date(post.createdAt).toLocaleString()}</p>
                        </CardHeader>
                        <CardContent>
                            <p>{post.content}</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost">
                                <Heart className="mr-2 h-4 w-4" />
                                0 Likes
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

