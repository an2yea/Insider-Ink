"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CompanyCardProps {
  company: {
    name: string
    score: number
    tags: string[]
  }
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{company.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold mr-2">{company.score.toFixed(1)}</span>
            <div className="w-full bg-secondary rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${(company.score / 10) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {company.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

