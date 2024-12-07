"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/src/contexts/AuthContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "@/app/types/user"
import { useDashboardContext } from "@/src/contexts/DashboardContext"
import detectEthereumProvider  from "@metamask/detect-provider"
import { zkSign } from "@/components/zkauth"

export function CreateAccountForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [selectedCompany, setSelectedCompany] = useState<{name: string, id: string}>({name: "", id: ""})
  const { signup } = useAuth()
  const { setUser, setUserId, companies } = useDashboardContext()
  const router = useRouter()

  const connectMetaMask = async () => {
    const provider = await detectEthereumProvider()
    console.log("Provider:", provider)
    if (provider) {
      try { 
        const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" })
        setWalletAddress(accounts[0])
        console.log("Accounts:", accounts)
      } catch (error) {
        setError("User rejected the request")
      }
    } else {
      setError("MetaMask not detected, please install MetaMask")
    }
  }

  const validateEmailDomain = () => {
    const expectedDomain = `@${selectedCompany.name.toLowerCase()}.com`
    if (!email.endsWith(expectedDomain)) {
      setError(`Email must end with ${expectedDomain}`)
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmailDomain()) {
      setError("Email must end with selected the company domain")
      return
    }
    if (walletAddress === "") {
      connectMetaMask()
      return
    }
    try {
      setError("")
      const isZkSigned = await zkSign(email, username)
      if (!isZkSigned) {
        setError("Failed to verify email")
        return
      }
      const user = await signup(email, password, {
        username: username,
        walletAddress: walletAddress,
        companyId: selectedCompany.id,
        companyName: selectedCompany.name,
      })

      setUserId(user?.uid)
      // fetch the user data from the database
      const userData = await fetch(`/api/users/${user?.uid}`)
      const userObject = await userData.json() as User
      setUser(userObject) // set the user in the dashboard context

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || "Failed to create account")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {error && (
        <div className="p-3 text-sm text-red-500 text-center">
          {error}
        </div>
      )}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Select value={selectedCompany.id} onValueChange={(value) => {
                const company = companies.find(c => c.id === value)
                setSelectedCompany(company || {name: "", id: ""})
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

