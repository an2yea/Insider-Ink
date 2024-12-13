"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDashboardContext } from "@/src/contexts/DashboardContext"
import { format } from 'date-fns'
import { AnimatePresence, motion } from "framer-motion"
import { Heart } from 'lucide-react'
import { useState } from "react"
import CreatePostForm from "./CreatePostForm"

export function PostsTab() {
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
    const { selectedCompanyId, setSelectedCompanyId, companies, posts, setPosts, setCompanies, statusLoading, statusSuccessful, statusFailure } = useDashboardContext()

    const filteredPosts = selectedCompanyId
        ? posts.filter(post => post.companyId === selectedCompanyId)
        : posts


    const sortedPosts = filteredPosts.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Sort in descending order
    
    });


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
                                <CreatePostForm onClose={() => setIsCreatePostOpen(false)} />
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
            </div>
    );
}

