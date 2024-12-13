"use client"

import { Dashboard } from "@/components/dashboard"
import { useAuth } from "@/src/contexts/AuthContext"
import { useEffect } from "react"
import { useDashboardContext } from "@/src/contexts/DashboardContext"
import { useRouter } from "next/navigation"
import { User } from "../types/user"
import { Company } from "../types/company"
import { Post } from "../types/posts"
import { LoadingDialog } from "@/components/loading-dialog"

export default function DashboardPage() {

  const { user: firebaseUser}  = useAuth()
  const {setUser, setUserId, setCompanies, setPosts, loading, loadingMessage} = useDashboardContext()
  const router = useRouter()

  useEffect(() => {
    if (!firebaseUser?.uid) {
      router.push("/login")
    }
    setUserId(firebaseUser?.uid || null)
    const fetchUser = async () => {
      const userData = await fetch(`/api/users/${firebaseUser?.uid}`)
      const userObject = await userData.json() as User
      setUser(userObject) // set the user in the dashboard context
    }
    fetchUser()
  }, [firebaseUser])

  useEffect(() => {
    const fetchCompanies = async () => {
      const companiesData = await fetch("/api/companies/get")
      const companiesObject = await companiesData.json() as Company[]
      console.log("Companies:", companiesObject)
      setCompanies(companiesObject) // set the companies in the dashboard context
    }
    fetchCompanies()
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await fetch("/api/posts/get")
      const postsObject = await postsData.json() as Post[]
      console.log("Posts:", postsObject)
      setPosts(postsObject) // set the posts in the dashboard context
    }
    fetchPosts()
  }, [])

  return <div> 
  <Dashboard />
  <LoadingDialog isOpen={loading} loadingMessage={loadingMessage}></LoadingDialog>
  </div>
}

