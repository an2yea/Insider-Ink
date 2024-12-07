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
import { dummyPosts } from "@/lib/dummyPosts"
// import { dummyCompanies as companies } from "@/lib/dummyCompany"
import { Company } from "@/app/types/company"
import { Label } from "@radix-ui/react-label"


export function PostsTab() {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [media, setMedia] = useState<File | null>(null)
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
    const { selectedCompanyId, setSelectedCompanyId } = useDashboardContext()
    const { user, userId } = useDashboardContext()

    const companies: Company[] = [
        {
            id: "1",
            name: "TechPioneers Inc.",
            description: "A leading company revolutionizing technology for distributed systems.",
            website: "https://techpioneers.com",
            averageRating: 4.5,
            tags: [{ id: "101", name: "Technology", rating: 4.5 }, { id: "102", name: "Distributed Systems", rating: 4.5 }],
            posts: ["Scaling Distributed Systems"],
            logoUrl: "https://example.com/logos/techpioneers.png",
        },
        {
            id: "2",
            name: "AIVisionary Co.",
            description: "Shaping the future with cutting-edge AI and automation.",
            website: "https://aivisionary.com",
            averageRating: 4.7,
            tags: [{ id: "103", name: "AI", rating: 4.7 }, { id: "104", name: "Innovation", rating: 4.7 }],
            posts: ["Future of AI Agents"],
            logoUrl: "https://example.com/logos/aivisionary.png",
        },
        {
            id: "3",
            name: "CloudNexus",
            description: "Experts in cloud technologies and Kubernetes optimization.",
            website: "https://cloudnexus.com",
            averageRating: 4.6,
            tags: [{ id: "105", name: "Cloud", rating: 4.6 }, { id: "106", name: "Kubernetes", rating: 4.6 }],
            posts: ["Kubernetes Best Practices"],
            logoUrl: "https://example.com/logos/cloudnexus.png",
        },
        {
            id: "4",
            name: "ResilientTech",
            description: "Building reliable microservices for a resilient future.",
            website: "https://resilienttech.com",
            averageRating: 4.4,
            tags: [{ id: "107", name: "Microservices", rating: 4.4 }, { id: "108", name: "Reliability", rating: 4.4 }],
            posts: ["Building Resilient Microservices"],
            logoUrl: "https://example.com/logos/resilienttech.png",
        },
        {
            id: "5",
            name: "TeamEmpower",
            description: "Empowering remote teams with collaborative solutions.",
            website: "https://teamempower.com",
            averageRating: 4.3,
            tags: [{ id: "109", name: "Remote Work", rating: 4.3 }, { id: "110", name: "Collaboration", rating: 4.3 }],
            posts: ["Empowering Remote Teams"],
            logoUrl: "https://example.com/logos/teamempower.png",
        },
    ];

    const filteredPosts = selectedCompanyId
        ? dummyPosts.filter(post => post.companyId === selectedCompanyId)
        : dummyPosts

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
                {filteredPosts.map((post) => (
                    <Card key={post.companyId}>
                        <CardHeader>
                            <CardTitle>{post.userId}</CardTitle>
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

