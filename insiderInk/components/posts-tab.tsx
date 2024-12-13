"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { useDashboardContext } from "@/src/contexts/DashboardContext"
import { format } from 'date-fns'
import { AnimatePresence } from "framer-motion"
import { Heart, X } from 'lucide-react'
import { useEffect, useState } from "react"
import CreatePostForm from "./CreatePostForm"

export function PostsTab() {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [media, setMedia] = useState<File | null>(null)
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
    const { selectedCompanyId, setSelectedCompanyId, companies, posts } = useDashboardContext()
    const { user, userId } = useDashboardContext()
    const [error, setError] = useState<string | null>(null)
    const filteredPosts = selectedCompanyId
        ? posts.filter(post => post.companyId === selectedCompanyId)
        : posts
    
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [error])

    const sortedPosts = filteredPosts.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Sort in descending order
    
    });

    const handleCloseError = () => {
        setError(null)
    }

    return (
        <ToastProvider>
            <div className="space-y-8">
                <div>
                    <Button onClick={() => setIsCreatePostOpen(!isCreatePostOpen)}>
                        {isCreatePostOpen ? "Cancel" : "Create Post"}
                    </Button>
                    <AnimatePresence>
                        {isCreatePostOpen && 
                        <CreatePostForm onClose={() => setIsCreatePostOpen(false)} />
                        }
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
                    {sortedPosts.map((post, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{post.title}</CardTitle>
                                <p className="text-sm text-muted-foreground">{post.companyName} • {format(new Date(post.createdAt), 'MMMM d, yyyy h:mm a')}</p>
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
                <AnimatePresence>
                    {error && (
                        <Toast variant="destructive">
                            <div className="flex justify-between items-start">
                                <div>
                                    <ToastTitle>Notification</ToastTitle>
                                    <ToastDescription>{error}</ToastDescription>
                                </div>
                                <ToastClose asChild>
                                    <button
                                        onClick={handleCloseError}
                                        className="rounded-full p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
                                    >
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Close</span>
                                    </button>
                                </ToastClose>
                            </div>
                        </Toast>
                    )}
                </AnimatePresence>
                <ToastViewport />
            </div>
        </ToastProvider>
    )
}

