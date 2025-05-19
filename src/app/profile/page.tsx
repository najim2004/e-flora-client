"use client"

import { useState } from "react"
import Link from "next/link"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-green-50">

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <Card className="border-green-100 shadow-sm sticky top-8">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
                      <AvatarFallback className="bg-green-200 text-green-700 text-xl">RA</AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-green-600 text-white hover:bg-green-700"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Change profile picture</span>
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold text-green-800">Rahim Ahmed</h2>
                  <p className="text-green-600 mb-4">Rice Farmer</p>
                  <div className="flex items-center text-green-700 mb-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex items-center text-green-700 mb-1">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">rahim.ahmed@example.com</span>
                  </div>
                  <div className="flex items-center text-green-700 mb-4">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">+880 1234 567890</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel Editing" : "Edit Profile"}
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium text-green-800 mb-3">Account Navigation</h3>
                  <nav className="space-y-1">
                    <Link
                      href="/profile"
                      className="flex items-center px-3 py-2 text-green-700 bg-green-100 rounded-md"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile Information
                    </Link>
                    <Link
                      href="/profile/activity"
                      className="flex items-center px-3 py-2 text-green-700 hover:bg-green-100 rounded-md"
                    >
                      <Calendar className="h-4 w-4 mr-3" />
                      Activity History
                    </Link>
                    <Link
                      href="/profile/settings"
                      className="flex items-center px-3 py-2 text-green-700 hover:bg-green-100 rounded-md"
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
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value="farm" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  Farm Details
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Preferences
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <Card className="border-green-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800">Personal Information</CardTitle>
                    <CardDescription className="text-green-700">
                      Manage your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-green-700">
                              Full Name
                            </Label>
                            <Input
                              id="fullName"
                              defaultValue="Rahim Ahmed"
                              className="border-green-200 focus:border-green-500 focus:ring-green-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="occupation" className="text-green-700">
                              Occupation
                            </Label>
                            <Input
                              id="occupation"
                              defaultValue="Rice Farmer"
                              className="border-green-200 focus:border-green-500 focus:ring-green-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-green-700">
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              defaultValue="rahim.ahmed@example.com"
                              className="border-green-200 focus:border-green-500 focus:ring-green-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-green-700">
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              defaultValue="+880 1234 567890"
                              className="border-green-200 focus:border-green-500 focus:ring-green-500"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address" className="text-green-700">
                              Address
                            </Label>
                            <Textarea
                              id="address"
                              defaultValue="123 Farmer's Lane, Dhaka, Bangladesh"
                              className="border-green-200 focus:border-green-500 focus:ring-green-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dateOfBirth" className="text-green-700">
                              Date of Birth
                            </Label>
                            <Input
                              id="dateOfBirth"
                              type="date"
                              defaultValue="1985-06-15"
                              className="border-green-200 focus:border-green-500 focus:ring-green-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender" className="text-green-700">
                              Gender
                            </Label>
                            <Select defaultValue="male">
                              <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
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
                            className="border-green-600 text-green-600 hover:bg-green-50"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            className="bg-green-600 hover:bg-green-700"
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
                            <h3 className="text-sm font-medium text-green-600">Full Name</h3>
                            <p className="mt-1 text-green-800">Rahim Ahmed</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-green-600">Occupation</h3>
                            <p className="mt-1 text-green-800">Rice Farmer</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-green-600">Email Address</h3>
                            <p className="mt-1 text-green-800">rahim.ahmed@example.com</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-green-600">Phone Number</h3>
                            <p className="mt-1 text-green-800">+880 1234 567890</p>
                          </div>
                          <div className="md:col-span-2">
                            <h3 className="text-sm font-medium text-green-600">Address</h3>
                            <p className="mt-1 text-green-800">123 Farmer's Lane, Dhaka, Bangladesh</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-green-600">Date of Birth</h3>
                            <p className="mt-1 text-green-800">June 15, 1985</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-green-600">Gender</h3>
                            <p className="mt-1 text-green-800">Male</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-green-100 shadow-sm mt-6">
                  <CardHeader>
                    <CardTitle className="text-green-800">Account Security</CardTitle>
                    <CardDescription className="text-green-700">
                      Manage your password and account security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-green-800">Password</h3>
                          <p className="text-sm text-green-600">Last changed 3 months ago</p>
                        </div>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                          Change Password
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-green-800">Two-Factor Authentication</h3>
                          <p className="text-sm text-green-600">Add an extra layer of security to your account</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-green-800">Login Notifications</h3>
                          <p className="text-sm text-green-600">Receive alerts when someone logs into your account</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Farm Details Tab */}
              <TabsContent value="farm">
                <Card className="border-green-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800">Farm Information</CardTitle>
                    <CardDescription className="text-green-700">
                      Manage details about your farm and agricultural practices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="farmName" className="text-green-700">
                              Farm Name
                            </Label>
                            <Input
                              id="farmName"
                              defaultValue="Green Harvest Farm"
                              className="border-green-200 focus:border-green-500 focus:ring-green-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="farmSize" className="text-green-700">
                              Farm Size (Acres)
                            </Label>
                            <Input
                              id="farmSize"
                              type="number"
                              defaultValue="5.5"
                              className="border-green-200 focus:border-green-500 focus:ring-green-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location" className="text-green-700">
                              Location
                            </Label>
                            <Input
                              id="location"
                              defaultValue="Savar, Dhaka"
                              className="border-green-200 focus:border-green-500 focus:ring-green-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="soilType" className="text-green-700">
                              Primary Soil Type
                            </Label>
                            <Select defaultValue="clay">
                              <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                                <SelectValue placeholder="Select soil type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="clay">Clay Soil</SelectItem>
                                <SelectItem value="sandy">Sandy Soil</SelectItem>
                                <SelectItem value="loamy">Loamy Soil</SelectItem>
                                <SelectItem value="silty">Silty Soil</SelectItem>
                                <SelectItem value="peaty">Peaty Soil</SelectItem>
                                <SelectItem value="chalky">Chalky Soil</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="irrigation" className="text-green-700">
                              Irrigation Type
                            </Label>
                            <Select defaultValue="flood">
                              <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                                <SelectValue placeholder="Select irrigation type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="flood">Flood Irrigation</SelectItem>
                                <SelectItem value="drip">Drip Irrigation</SelectItem>
                                <SelectItem value="sprinkler">Sprinkler System</SelectItem>
                                <SelectItem value="rainfed">Rainfed Only</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="farmingType" className="text-green-700">
                              Farming Type
                            </Label>
                            <Select defaultValue="conventional">
                              <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                                <SelectValue placeholder="Select farming type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="conventional">Conventional</SelectItem>
                                <SelectItem value="organic">Organic</SelectItem>
                                <SelectItem value="mixed">Mixed Methods</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="primaryCrops" className="text-green-700">
                            Primary Crops
                          </Label>
                          <Textarea
                            id="primaryCrops"
                            defaultValue="Rice (Boro, Aman), Jute, Wheat"
                            className="border-green-200 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="border-green-600 text-green-600 hover:bg-green-50"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            className="bg-green-600 hover:bg-green-700"
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
                            <h3 className="text-sm font-medium text-green-600">Farm Name</h3>
                            <p className="mt-1 text-green-800">Green Harvest Farm</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-green-600">Farm Size</h3>
                            <p className="mt-1 text-green-800">5.5 Acres</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-green-600">Location</h3>
                            <p className="mt-1 text-green-800">Savar, Dhaka</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-green-600">Primary Soil Type</h3>
                            <p className="mt-1 text-green-800">Clay Soil</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-green-600">Irrigation Type</h3>
                            <p className="mt-1 text-green-800">Flood Irrigation</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-green-600">Farming Type</h3>
                            <p className="mt-1 text-green-800">Conventional</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-green-600">Primary Crops</h3>
                          <p className="mt-1 text-green-800">Rice (Boro, Aman), Jute, Wheat</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-green-100 shadow-sm mt-6">
                  <CardHeader>
                    <CardTitle className="text-green-800">Equipment & Resources</CardTitle>
                    <CardDescription className="text-green-700">
                      Information about your farming equipment and resources
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-green-800 mb-3">Available Equipment</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Tractor</Badge>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Power Tiller</Badge>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Water Pump</Badge>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Sprayer</Badge>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Harvester</Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-green-800 mb-3">Labor Resources</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-green-600">Family Workers</h4>
                            <p className="mt-1 text-green-800">3 people</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-green-600">Hired Workers (Seasonal)</h4>
                            <p className="mt-1 text-green-800">8-10 people</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences">
                <Card className="border-green-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800">Notification Preferences</CardTitle>
                    <CardDescription className="text-green-700">
                      Manage how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-green-800">Email Notifications</h3>
                          <p className="text-sm text-green-600">Receive updates and alerts via email</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-green-800">SMS Notifications</h3>
                          <p className="text-sm text-green-600">Receive updates and alerts via SMS</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-green-800">Weather Alerts</h3>
                          <p className="text-sm text-green-600">Receive alerts about weather conditions</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-green-800">Crop Price Updates</h3>
                          <p className="text-sm text-green-600">Receive updates about market prices</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-green-800">Disease Outbreak Alerts</h3>
                          <p className="text-sm text-green-600">
                            Receive alerts about crop disease outbreaks in your area
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-100 shadow-sm mt-6">
                  <CardHeader>
                    <CardTitle className="text-green-800">App Preferences</CardTitle>
                    <CardDescription className="text-green-700">Customize your app experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="language" className="text-green-700">
                          Preferred Language
                        </Label>
                        <Select defaultValue="bn">
                          <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bn">Bengali (বাংলা)</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="units" className="text-green-700">
                          Measurement Units
                        </Label>
                        <Select defaultValue="metric">
                          <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                            <SelectValue placeholder="Select units" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="metric">Metric (Celsius, Kilometers)</SelectItem>
                            <SelectItem value="imperial">Imperial (Fahrenheit, Miles)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-green-800">Data Saving Mode</h3>
                          <p className="text-sm text-green-600">Reduce data usage by loading lower quality images</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Recent Activity Section */}
            <Card className="border-green-100 shadow-sm mt-8">
              <CardHeader>
                <CardTitle className="text-green-800">Recent Activity</CardTitle>
                <CardDescription className="text-green-700">Your recent interactions with the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">Disease Detection</h3>
                      <p className="text-sm text-green-700">You detected Rice Blast disease in your crop</p>
                      <p className="text-xs text-green-500 mt-1">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Sprout className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">Crop Suggestion</h3>
                      <p className="text-sm text-green-700">
                        You received recommendations for your next planting season
                      </p>
                      <p className="text-xs text-green-500 mt-1">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">AI Chatbot Conversation</h3>
                      <p className="text-sm text-green-700">You asked about fertilizer recommendations for rice</p>
                      <p className="text-xs text-green-500 mt-1">1 week ago</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="link" className="text-green-600">
                    View All Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
