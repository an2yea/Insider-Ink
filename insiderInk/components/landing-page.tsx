"use client"


import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Brain, Users, Eye } from 'lucide-react'
import { useRouter } from "next/navigation"
export function LandingPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }
  const router = useRouter()
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            True Network
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empowering Transparency in the Workplace
          </motion.p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        <section>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            {...fadeIn}
          >
            How the Platform Works
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "ZK Email Verification", 
                description: "Ensure authenticity without compromising privacy using Zero-Knowledge proofs.",
                icon: Shield
              },
              { 
                title: "AI-Powered Analysis", 
                description: "Analyze content and calculate reputation using advanced AI algorithms.",
                icon: Brain
              },
              { 
                title: "User Attestation", 
                description: "Attest to posts without revealing personal information, powered by blockchain.",
                icon: Users
              },
              { 
                title: "Transparency", 
                description: "Public access to posts and reputation scores for informed decision-making.",
                icon: Eye
              }
            ].map((feature, index) => (
              <motion.div key={index} {...fadeIn} transition={{ delay: 0.1 * index }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <feature.icon className="w-6 h-6" />
                      <span>{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            {...fadeIn}
          >
            Key Features
          </motion.h2>
          <div className="space-y-8">
            {[
              {
                title: "ZK Email Verification",
                description: "Users verify their organizational affiliation without exposing personal details, ensuring authenticity while maintaining anonymity."
              },
              {
                title: "AI-Powered Content Analysis",
                description: "Advanced AI algorithms analyze posts to identify themes, sentiment, and key issues, providing valuable insights into organizational culture."
              },
              {
                title: "Reputation Calculation",
                description: "True Network's algorithms calculate and update organization reputation scores based on aggregated, verified employee feedback."
              },
              {
                title: "User Attestation",
                description: "Blockchain-powered attestation allows users to verify their posts' authenticity without compromising their identity."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            {...fadeIn}
          >
            Ready to Join?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            Experience the power of anonymous, verified feedback.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button onClick={() => router.push("/create-account")} size="lg" className="text-lg">
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </motion.div> 
        </section>
      </main>

      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 True Network. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

