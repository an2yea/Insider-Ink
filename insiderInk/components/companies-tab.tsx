"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDashboardContext } from "@/src/contexts/DashboardContext"
import { motion } from "framer-motion"


export function CompaniesTab() {

    const { setSelectedCompanyId, setActiveTab, companies } = useDashboardContext()

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
                                        style={{ width: `${  ((company.averageRating - 0) / (1000 - 0)) * 100}%` }}
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

