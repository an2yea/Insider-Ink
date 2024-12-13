"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'

interface LoadingDialogProps {
  isOpen: boolean
  loadingMessage: string
}

export function LoadingDialog({ isOpen, loadingMessage }: LoadingDialogProps) {
  const [message, setMessage] = useState(loadingMessage)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setMessage(loadingMessage)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, loadingMessage])

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <Card className="border-none shadow-none">
          <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.p
                key={message}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center text-lg font-medium"
              >
                {message}
              </motion.p>
            </AnimatePresence>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

