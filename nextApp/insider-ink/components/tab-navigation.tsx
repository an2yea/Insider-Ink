"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TabNavigationProps {
  activeTab: number
  setActiveTab: (index: number) => void
}

const tabItems = ["Posts", "Companies"]

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <Tabs value={activeTab.toString()} onValueChange={(value) => setActiveTab(parseInt(value))}>
      <TabsList className="grid w-full grid-cols-2 mb-8">
        {tabItems.map((item, index) => (
          <TabsTrigger
            key={index}
            value={index.toString()}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

