"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function AddCompanyForm() {
  const [companyName, setCompanyName] = useState("")
  const [companyWebsite, setCompanyWebsite] = useState("")
  const [companyDescription, setCompanyDescription] = useState("")
  const [companyLogo, setCompanyLogo] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Company Name:", companyName)
    console.log("Company Website:", companyWebsite)
    console.log("Company Description:", companyDescription)
    console.log("Company Logo:", companyLogo)
    const response = await fetch("/api/companies/create", {
      method: "POST",
      body: JSON.stringify({ name: companyName, website: companyWebsite, description: companyDescription, logoUrl: companyLogo })
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add New Company</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyWebsite">Company Website</Label>
              <Input
                id="companyWebsite"
                type="url"
                placeholder="https://company.com"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyDescription">Company Description</Label>
              <Input
                id="companyDescription"
                type="text"
                placeholder="Optional"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
                <Label htmlFor="companyLogo">Company Logo</Label>
                <Input
                    id="companyLogo"
                    type="url"
                    placeholder="https://company.com/logo.png"
                    value={companyLogo}
                    onChange={(e) => setCompanyLogo(e.target.value)}
                />
            </div>
            <Button type="submit" className="w-full">
              Add Company
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Go back to{" "}
            <Link href="/dashboard" className="text-primary hover:underline">
              Dashboard
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  )
} 