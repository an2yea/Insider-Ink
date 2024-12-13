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
import createWhistle from "./attestation"
import getSentimentScore from "./getSentimentScore"
import { useEffect } from "react"
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast";
import { X } from "lucide-react"
import { Post } from "@/app/types/posts"
import {format} from 'date-fns'
import { Company } from "@/app/types/company"

export function PostsTab() {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [media, setMedia] = useState<File | null>(null)
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
    const { selectedCompanyId, setSelectedCompanyId, companies, posts, setPosts, setCompanies } = useDashboardContext()
    const { user, userId } = useDashboardContext()
    //  const [notification, setNotification] = useState<string | null>(null); // State for notification
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

    const fetchPosts = async () => {
        const postsData = await fetch("/api/posts/get")
        const postsObject = await postsData.json() as Post[]
        console.log("Posts:", postsObject)
        setPosts(postsObject) // set the posts in the dashboard context
    }
    const fetchCompanies = async () => {
        const companiesData = await fetch("/api/companies/get")
        const companiesObject = await companiesData.json() as Company[]
        console.log("Companies:", companiesObject)
        setCompanies(companiesObject) // set the companies in the dashboard context
      }

    const getCompany = async() => {
        const response = await fetch(`/api/companies/${user?.companyId}`, {
            method: 'GET',
        })
        const companyDetails = await response.json() as Company
        return companyDetails
    }
    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Creating post:", title, content)
        setError("Creating post...")
        let sentimentScore = 0
        if (content) {
            sentimentScore = await getSentimentScore(content)
            setError("Post received, sentiment score: " + sentimentScore)
        }
        try {
            const company = await getCompany()
            const companyRating = company.averageRating
            const companyAddress = company.walletAddress
            if (userId) {
                setError("Creating attestation for your post...")
                const { blockHash, reputationScore } = await createWhistle(companyAddress, title, content, sentimentScore, companyRating)
                if (blockHash) {
                    setError(`Attestation created successfully, Received block hash: ${blockHash}`)
                    const reqData = {
                        title,
                        content,
                        userId,
                        username: "an2yea",
                        companyId: user?.companyId || '',
                        companyName: user?.companyName || '',
                        blockHash
                    }
                    const response = await fetch('/api/attestations', {
                        method: 'POST',
                        body: JSON.stringify(reqData),
                    })
                    if (!response.ok) {
                        console.error("Failed to create attestation:", response.statusText)
                        setError("Failed to create attestation: " + response.statusText)
                    }
                }
                if (reputationScore) {
                    console.log("Updating company reputation score")
                    const response = await fetch(`/api/companies/${user?.companyId}`, {
                        method: 'PATCH',
                        body: JSON.stringify({ averageRating: reputationScore }),
                    })
                    if (!response.ok) {
                        setError("Failed to update company reputation: Please try again in some time")
                        console.error("Failed to update company reputation:", response.statusText)
                    } else {
                        console.log("Updated reputation score")
                        setError(`Company reputation for ${user?.companyName} updated to, ${reputationScore}`)
                    }
                }
            }
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
            fetchPosts()
            fetchCompanies()
            setIsCreatePostOpen(false)
            setTitle("")
            setContent("")
            setMedia(null)
        } catch (error) {
            console.error("Error creating post:", error)
        }
    }

    return (
        <ToastProvider>
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
                                            <Button type="submit"> Create Attestation </Button>
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

