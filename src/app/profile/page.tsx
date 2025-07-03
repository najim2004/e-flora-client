"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Camera,
  Edit2,
  MapPin,
  Mail,
  Phone,
  Calendar,
  User,
  Settings,
  LogOut,
  Leaf,
  Sprout,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/3">
            <Card className="border-border shadow-sm sticky top-8">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                      <AvatarImage
                        src="/placeholder.svg?height=96&width=96"
                        alt="Profile picture"
                      />
                      <AvatarFallback className="bg-secondary/60 text-primary/80 text-xl">
                        RA
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white hover:bg-primary/80"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Change profile picture</span>
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold text-primary">
                    Rahim Ahmed
                  </h2>
                  <p className="text-primary mb-4">Gardener</p>
                  <div className="flex items-center text-primary/80 mb-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex items-center text-primary/80 mb-1">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">rahim.ahmed@example.com</span>
                  </div>
                  <div className="flex items-center text-primary/80 mb-4">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">+880 1234 567890</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-secondary/60"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel Editing" : "Edit Profile"}
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium text-primary mb-3">
                    Account Navigation
                  </h3>
                  <nav className="space-y-1">
                    <Link
                      href="/profile"
                      className="flex items-center px-3 py-2 text-primary/80 bg-secondary/60 rounded-md"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile Information
                    </Link>
                    <Link
                      href="/profile/activity"
                      className="flex items-center px-3 py-2 text-primary/80 hover:bg-secondary/60 rounded-md"
                    >
                      <Calendar className="h-4 w-4 mr-3" />
                      Activity History
                    </Link>
                    <Link
                      href="/profile/settings"
                      className="flex items-center px-3 py-2 text-primary/80 hover:bg-secondary/60 rounded-md"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Account Settings
                    </Link>
                    <button className="w-full flex items-center px-3 py-2 text-destructive hover:bg-red-50 rounded-md">
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </nav>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6 h-max p-1.5 rounded-sm w-full">
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white py-1.5 rounded-sm text-gray-400"
                >
                  Personal Info
                </TabsTrigger>
                <TabsTrigger
                  value="garden"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white py-1.5 rounded-sm text-gray-400"
                >
                  Garden Details
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-primary">
                      Personal Information
                    </CardTitle>
                    <CardDescription className="text-primary/80">
                      Manage your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label
                              htmlFor="fullName"
                              className="text-primary/80"
                            >
                              Full Name
                            </Label>
                            <Input
                              id="fullName"
                              defaultValue="Rahim Ahmed"
                              className="border-border focus:border-primary/80 focus:ring-primary/80"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="occupation"
                              className="text-primary/80"
                            >
                              Occupation
                            </Label>
                            <Input
                              id="occupation"
                              defaultValue="Gardener"
                              className="border-border focus:border-primary/80 focus:ring-primary/80"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-primary/80">
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              defaultValue="rahim.ahmed@example.com"
                              className="border-border focus:border-primary/80 focus:ring-primary/80"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-primary/80">
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              defaultValue="+880 1234 567890"
                              className="border-border focus:border-primary/80 focus:ring-primary/80"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label
                              htmlFor="address"
                              className="text-primary/80"
                            >
                              Address
                            </Label>
                            <Textarea
                              id="address"
                              defaultValue="123 Gardener's Lane, Dhaka, Bangladesh"
                              className="border-border focus:border-primary/80 focus:ring-primary/80"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="dateOfBirth"
                              className="text-primary/80"
                            >
                              Date of Birth
                            </Label>
                            <Input
                              id="dateOfBirth"
                              type="date"
                              defaultValue="1985-06-15"
                              className="border-border focus:border-primary/80 focus:ring-primary/80"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender" className="text-primary/80">
                              Gender
                            </Label>
                            <Select defaultValue="male">
                              <SelectTrigger className="border-border focus:border-primary/80 focus:ring-primary/80">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="border-primary text-primary hover:bg-green-50"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            className="bg-primary hover:bg-primary/80"
                            onClick={() => setIsEditing(false)}
                          >
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-primary">
                              Full Name
                            </h3>
                            <p className="mt-1 text-primary">Rahim Ahmed</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-primary">
                              Occupation
                            </h3>
                            <p className="mt-1 text-primary">Gardener</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-primary">
                              Email Address
                            </h3>
                            <p className="mt-1 text-primary">
                              rahim.ahmed@example.com
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-primary">
                              Phone Number
                            </h3>
                            <p className="mt-1 text-primary">
                              +880 1234 567890
                            </p>
                          </div>
                          <div className="md:col-span-2">
                            <h3 className="text-sm font-medium text-primary">
                              Address
                            </h3>
                            <p className="mt-1 text-primary">
                              123 Gardener&#39;s Lane, Dhaka, Bangladesh
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-primary">
                              Date of Birth
                            </h3>
                            <p className="mt-1 text-primary">June 15, 1985</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-primary">
                              Gender
                            </h3>
                            <p className="mt-1 text-primary">Male</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-border shadow-sm mt-6">
                  <CardHeader>
                    <CardTitle className="text-primary">
                      Account Security
                    </CardTitle>
                    <CardDescription className="text-primary/80">
                      Manage your password and account security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-primary">Password</h3>
                          <p className="text-sm text-primary">
                            Last changed 3 months ago
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-primary text-primary hover:bg-green-50"
                        >
                          Change Password
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-primary">
                            Two-Factor Authentication
                          </h3>
                          <p className="text-sm text-primary">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-primary">
                            Login Notifications
                          </h3>
                          <p className="text-sm text-primary">
                            Receive alerts when someone logs into your account
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Garden Details Tab */}
              <TabsContent value="garden">
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-primary">
                      Garden Information
                    </CardTitle>
                    <CardDescription className="text-primary/80">
                      Manage details about your garden
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label
                              htmlFor="gardenName"
                              className="text-primary/80"
                            >
                              Garden Name
                            </Label>
                            <Input
                              id="gardenName"
                              defaultValue="Green Harvest Garden"
                              className="border-border focus:border-primary/80 focus:ring-primary/80"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="gardenSize"
                              className="text-primary/80"
                            >
                              Garden Size (Sq. Ft.)
                            </Label>
                            <Input
                              id="gardenSize"
                              type="number"
                              defaultValue="5.5"
                              className="border-border focus:border-primary/80 focus:ring-primary/80"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="location"
                              className="text-primary/80"
                            >
                              Location
                            </Label>
                            <Input
                              id="location"
                              defaultValue="Savar, Dhaka"
                              className="border-border focus:border-primary/80 focus:ring-primary/80"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="soilType"
                              className="text-primary/80"
                            >
                              Primary Soil Type
                            </Label>
                            <Select defaultValue="clay">
                              <SelectTrigger className="border-border focus:border-primary/80 focus:ring-primary/80">
                                <SelectValue placeholder="Select soil type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="clay">Clay Soil</SelectItem>
                                <SelectItem value="sandy">
                                  Sandy Soil
                                </SelectItem>
                                <SelectItem value="loamy">
                                  Loamy Soil
                                </SelectItem>
                                <SelectItem value="silty">
                                  Silty Soil
                                </SelectItem>
                                <SelectItem value="peaty">
                                  Peaty Soil
                                </SelectItem>
                                <SelectItem value="chalky">
                                  Chalky Soil
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="irrigation"
                              className="text-primary/80"
                            >
                              Irrigation Type
                            </Label>
                            <Select defaultValue="flood">
                              <SelectTrigger className="border-border focus:border-primary/80 focus:ring-primary/80">
                                <SelectValue placeholder="Select irrigation type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="flood">
                                  Flood Irrigation
                                </SelectItem>
                                <SelectItem value="drip">
                                  Drip Irrigation
                                </SelectItem>
                                <SelectItem value="sprinkler">
                                  Sprinkler System
                                </SelectItem>
                                <SelectItem value="rainfed">
                                  Rainfed Only
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="gardeningType"
                              className="text-primary/80"
                            >
                              Gardening Type
                            </Label>
                            <Select defaultValue="conventional">
                              <SelectTrigger className="border-border focus:border-primary/80 focus:ring-primary/80">
                                <SelectValue placeholder="Select gardening type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="conventional">
                                  Conventional
                                </SelectItem>
                                <SelectItem value="organic">Organic</SelectItem>
                                <SelectItem value="mixed">
                                  Mixed Methods
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="primaryPlants"
                            className="text-primary/80"
                          >
                            Primary Plants
                          </Label>
                          <Textarea
                            id="primaryPlants"
                            defaultValue="Tomatoes, Cucumbers, Peppers"
                            className="border-border focus:border-primary/80 focus:ring-primary/80"
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="border-primary text-primary hover:bg-green-50"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            className="bg-primary hover:bg-primary/80"
                            onClick={() => setIsEditing(false)}
                          >
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-primary">
                              Garden Name
                            </h3>
                            <p className="mt-1 text-primary">
                              Green Harvest Garden
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-primary">
                              Garden Size
                            </h3>
                            <p className="mt-1 text-primary">5.5 Sq. Ft.</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-primary">
                              Location
                            </h3>
                            <p className="mt-1 text-primary">Savar, Dhaka</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-primary">
                              Primary Soil Type
                            </h3>
                            <p className="mt-1 text-primary">Clay Soil</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-primary">
                              Irrigation Type
                            </h3>
                            <p className="mt-1 text-primary">
                              Flood Irrigation
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-primary">
                              Gardening Type
                            </h3>
                            <p className="mt-1 text-primary">Conventional</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-primary">
                            Primary Plants
                          </h3>
                          <p className="mt-1 text-primary">
                            Tomatoes, Cucumbers, Peppers
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-border shadow-sm mt-6">
                  <CardHeader>
                    <CardTitle className="text-primary">
                      Equipment & Resources
                    </CardTitle>
                    <CardDescription className="text-primary/80">
                      Information about your gardening equipment and resources
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-primary mb-3">
                          Available Equipment
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-secondary/60 text-primary/80 hover:bg-secondary/60">
                            Tractor
                          </Badge>
                          <Badge className="bg-secondary/60 text-primary/80 hover:bg-secondary/60">
                            Power Tiller
                          </Badge>
                          <Badge className="bg-secondary/60 text-primary/80 hover:bg-secondary/60">
                            Water Pump
                          </Badge>
                          <Badge className="bg-secondary/60 text-primary/80 hover:bg-secondary/60">
                            Sprayer
                          </Badge>
                          <Badge className="bg-secondary/60 text-primary/80 hover:bg-secondary/60">
                            Harvester
                          </Badge>
                          <Badge className="bg-secondary/60 text-primary/80 hover:bg-secondary/60">
                            Seedling Tray
                          </Badge>
                          <Badge className="bg-secondary/60 text-primary/80 hover:bg-secondary/60">
                            Gardening Gloves
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-primary mb-3">
                          Labor Resources
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-primary">
                              Family Workers
                            </h4>
                            <p className="mt-1 text-primary">3 people</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-primary">
                              Hired Workers (Seasonal)
                            </h4>
                            <p className="mt-1 text-primary">8-10 people</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Recent Activity Section */}
            <Card className="border-border shadow-sm mt-8">
              <CardHeader>
                <CardTitle className="text-primary">Recent Activity</CardTitle>
                <CardDescription className="text-primary/80">
                  Your recent interactions with the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center mr-3 flex-shrink-0">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary">
                        Disease Detection
                      </h3>
                      <p className="text-sm text-primary/80">
                        You detected Rice Blast disease in your crop
                      </p>
                      <p className="text-xs text-primary/80 mt-1">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center mr-3 flex-shrink-0">
                      <Sprout className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary">
                        Crop Suggestion
                      </h3>
                      <p className="text-sm text-primary/80">
                        You received recommendations for your next planting
                        season
                      </p>
                      <p className="text-xs text-primary/80 mt-1">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center mr-3 flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary">
                        AI Chatbot Conversation
                      </h3>
                      <p className="text-sm text-primary/80">
                        You asked about fertilizer recommendations for rice
                      </p>
                      <p className="text-xs text-primary/80 mt-1">1 week ago</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="link" className="text-primary">
                    View All Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
