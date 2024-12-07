"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useDashboardContext } from "@/src/contexts/DashboardContext"
// import { dummyCompanies as companies } from "@/lib/dummyCompany"

import { Company } from "@/app/types/company"

export function CompaniesTab() {

    const { setSelectedCompanyId, setActiveTab } = useDashboardContext()


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

    const handleCompanyClick = (companyId: string) => {
        setSelectedCompanyId(companyId)
        setActiveTab(0) // Switch to Posts tab
    }
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
                <motion.div
                    key={company.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleCompanyClick(company.id)}
                >
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>{company.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center mb-4">
                                <span className="text-2xl font-bold mr-2">{company.averageRating.toFixed(1)}</span>
                                <div className="w-full bg-secondary rounded-full h-2.5">
                                    <div
                                        className="bg-primary h-2.5 rounded-full"
                                        style={{ width: `${(company.averageRating / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {company.tags.map((tag) => (
                                    <Badge key={tag.id} variant="secondary">
                                        {tag.name}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}

