"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAuth } from "@/src/contexts/AuthContext"
import { useDashboardContext } from "@/src/contexts/DashboardContext"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function Header( ) {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()
  const { user, setUser } = useDashboardContext()

  const handleLogout = () => {
    console.log("Logging out")
    logout()
    setUser(null)
    router.push("/login")
  }

  return (
    <header className="bg-background border-b border-border p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* <Image src="/logo.svg" alt="App Logo" width={40} height={40} /> */}
          <h1 className="text-2xl font-bold text-primary">Insider Ink</h1>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="p-0">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.username}`} />
                <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p><strong>Name:</strong> {user?.username}</p>
              <p><strong>Company:</strong> {user?.companyName}</p>
              <p><strong>Wallet Address:</strong> {user?.walletAddress}</p>
              <Button onClick={() => setIsOpen(false)}>Close</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}

