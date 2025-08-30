"use client"

import Link from "next/link"
import { User, Calendar, Settings, LogOut, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileSidebarProps {
  activeItem: "profile" | "activity" | "settings"
}

export function ProfileSidebar({ activeItem }: ProfileSidebarProps) {
  return (
    <Card className="border-border shadow-sm sticky top-8">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
              <AvatarFallback className="bg-muted text-secondary-foreground text-xl">RA</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-xl font-bold text-foreground">Rahim Ahmed</h2>
          <p className="text-muted-foreground mb-4">Rice Farmer</p>
        </div>

        <div className="mt-8">
          <h3 className="font-medium text-foreground mb-3">Account Navigation</h3>
          <nav className="space-y-1">
            <Link
              href="/profile"
              className={`flex items-center px-3 py-2 text-secondary-foreground rounded-md ${
                activeItem === "profile" ? "bg-secondary/10" : "hover:bg-secondary/10"
              }`}
            >
              <User className="h-4 w-4 mr-3" />
              Profile Information
            </Link>
            <Link
              href="/profile/activity"
              className={`flex items-center px-3 py-2 text-secondary-foreground rounded-md ${
                activeItem === "activity" ? "bg-secondary/10" : "hover:bg-secondary/10"
              }`}
            >
              <Calendar className="h-4 w-4 mr-3" />
              Activity History
            </Link>
            <Link
              href="/profile/settings"
              className={`flex items-center px-3 py-2 text-secondary-foreground rounded-md ${
                activeItem === "settings" ? "bg-secondary/10" : "hover:bg-secondary/10"
              }`}
            >
              <Settings className="h-4 w-4 mr-3" />
              Account Settings
            </Link>
            <button className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-md">
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Leaf className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-medium text-foreground">Farming Status</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Crop:</span>
                <span className="text-foreground font-medium">Rice (Boro)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Growth Stage:</span>
                <span className="text-foreground">Flowering</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Action:</span>
                <span className="text-foreground">Fertilizer Application</span>
              </div>
            </div>
            <Button className="w-full mt-3 bg-primary hover:bg-primary/80 text-sm">View Farm Details</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
