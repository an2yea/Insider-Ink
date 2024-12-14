"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { useDashboardContext } from "@/src/contexts/DashboardContext"
import { Description, DialogTitle } from "@radix-ui/react-dialog"
import { title } from "process"


const statusConfig = {
  loading: { icon: Loader2, color: 'text-primary', animate: 'animate-spin', title: "Loading" },
  success: { icon: CheckCircle, color: 'text-green-500', animate: '', title: "Success" },
  failure: { icon: XCircle, color: 'text-red-500', animate: '', title: "Failed"},
}

export function StatusDialog() {
  const {isStatusOpen, statusMessage, statusType, timeout, setIsStatusOpen }  = useDashboardContext()

  useEffect(() => {
    if (isStatusOpen) {
      if (statusType !== 'loading' && timeout) {
        const timer = setTimeout(() => {
            setIsStatusOpen(false)
        }, timeout)
        return () => clearTimeout(timer)
      }
    }
  }, [isStatusOpen, statusMessage, statusType, timeout])

  const { icon: Icon, color, animate, title } = statusConfig[statusType]

  return (
    <Dialog open={isStatusOpen} >
      <DialogContent className="sm:max-w-md">
        <DialogTitle > {title} </DialogTitle>
        <Description></Description>
        <Card className="border-none shadow-none">
          <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
            <motion.div
              key={statusMessage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon className={`h-12 w-12 ${color} ${animate}`} />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.p
                key={statusMessage}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center text-lg font-medium"
              >
                {statusMessage}
              </motion.p>
            </AnimatePresence>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
