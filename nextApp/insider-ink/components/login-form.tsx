"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/src/contexts/AuthContext"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/app/types/user"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useDashboardContext } from "@/src/contexts/DashboardContext"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const [error, setError] = useState("")
  const router = useRouter()
  const { setUser } = useDashboardContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError("")
      console.log("logging in")
      const res = await login(email, password)

      // fetch the user data from the database
      const userData = await fetch(`/api/users/${res?.uid}`)
      console.log("user data", userData)
      const userObject = await userData.json() as User
      console.log("user object", userObject)
      setUser(userObject) // set the user in the dashboard context

      console.log(userObject)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || "Failed to login")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md">
        {error && (
          <div className="p-3 text-sm text-red-500 text-center">
            {error}
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/create-account" className="text-primary hover:underline">
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

