import { Company } from "@/app/types/company";
import { Post } from "@/app/types/posts";
import { useDashboardContext } from "@/src/contexts/DashboardContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import getSentimentScore from "./functions/getSentimentScore";
import createWhistle from "./functions/attestation";

const CreatePostForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { user, userId, setPosts, setCompanies, statusFailure, statusLoading, statusSuccessful  } = useDashboardContext();
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [media, setMedia] = useState<File | null>(null)


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

        statusLoading("Creating your post...")
        let sentimentScore = 0
        if (content) {
            sentimentScore = await getSentimentScore(content)
            statusSuccessful(`Post received a sentiment score of ${sentimentScore}`)
        }
        try {
            const company = await getCompany()
            const companyRating = company.averageRating
            const companyAddress = company.walletAddress
            if (userId) {
                statusLoading("Creating Attestation for your post, this may take a while")
                const { blockHash, reputationScore } = await createWhistle(companyAddress, title, content, sentimentScore, companyRating)
                // let blockHash="0x", reputationScore=100
                if (blockHash) {
                    statusSuccessful(`Attestation created successfully, Received block hash: ${blockHash}`)
                    const reqData = {
                        title,
                        content,
                        userId,
                        username: user?.username,
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
                        statusFailure(`Failed to create attestation ${response.statusText}`)
                    }
                }
                if (reputationScore) {
                    statusLoading(`Updating ${user?.companyName}'s reputation score based on your post`)
                    const response = await fetch(`/api/companies/${user?.companyId}`, {
                        method: 'PATCH',
                        body: JSON.stringify({ averageRating: reputationScore }),
                    })
                    if (!response.ok) {
                        statusFailure(`Failed to update ${user?.companyName}'s reputation: Please try again in some time`)
                        console.error("Failed to update company reputation:", response.statusText)
                    } else {
                        console.log("Updated reputation score")
                        statusSuccessful(`Company reputation for ${user?.companyName} updated from ${companyRating} to ${reputationScore}`)
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
                statusFailure(`Failed to create post with error: ${response.statusText}`)
                console.error("Failed to create post:", response.statusText)
            }
            onClose()
            setTitle("")
            setContent("")
            setMedia(null)
        } catch (error) {
            statusFailure(`Error creating post: ${error}`)
        }
        fetchPosts()
        fetchCompanies()
    }

    return (
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
                        {/* <div>
                            <Label htmlFor="post-media">Upload Media</Label>
                            <Input
                                id="post-media"
                                type="file"
                                onChange={(e) => setMedia(e.target.files?.[0] || null)}
                                className="mt-1"
                            />
                        </div> */}
                        <Button type="submit"> Create Attestation </Button>
                    </form>
                </CardContent>
            </Card>
        </motion.div>)
}

export default CreatePostForm