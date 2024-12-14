"use client"

import { User } from "@/app/types/user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/src/contexts/AuthContext"
import { useDashboardContext } from "@/src/contexts/DashboardContext"
import detectEthereumProvider from "@metamask/detect-provider"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState } from "react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const { login } = useAuth()
  const router = useRouter()
  const { user, setUser, setUserId, statusFailure, statusLoading, statusSuccessful } = useDashboardContext()

  if (user) {
    router.push("/dashboard")
  }

  const connectMetaMask = async () => {
    const provider = await detectEthereumProvider()
    console.log("Provider:", provider)
    if (provider) {
      try { 
        const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" })
        setWalletAddress(accounts[0])
        setEmail(`${accounts[0]}@gmail.com`)
        console.log("Accounts:", accounts)
      } catch (error) {
        statusFailure(`Could not connect Metamask ${error}`)
      }
    } else {
      statusFailure("MetaMask not detected, please install MetaMask")
    }
  }

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      statusLoading("Logging you in to Insider Ink")
      const res = await login(email, password)

      setUserId(res?.uid)
      statusSuccessful("User Verified!")
      // fetch the user data from the database
      const userData = await fetch(`/api/users/${res?.uid}`)
      const userObject = await userData.json() as User
      setUser(userObject) // set the user in the dashboard context

      console.log(userObject)
      router.push('/dashboard')
    } catch (err: any) {
      statusFailure(err.message || "Failed to login")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {walletAddress && (
              <div className="space-y-2">
                <Label htmlFor="wallet-address">Wallet Address</Label>
                <Input id="wallet-address" type="text" value={walletAddress} disabled />
              </div>
            )}
            {!walletAddress && (
              <Button onClick={connectMetaMask} className="w-full">
                Connect MetaMask
              </Button>
            )}
            
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

