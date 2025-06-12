"use client"

import { useState } from "react"
import { Lock, Bell, Eye, Globe, Trash2, Download, AlertTriangle, Facebook, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ProfileSidebar } from "@/components/profile-sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AccountSettingsPage() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-green-50">

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <ProfileSidebar activeItem="settings" />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-primary">Account Settings</h1>
                <p className="text-green-600">Manage your account settings and preferences</p>
              </div>
            </div>

            {/* Security Settings */}
            <Card className="border-green-100 shadow-sm mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-green-600 mr-2" />
                  <CardTitle className="text-primary">Security Settings</CardTitle>
                </div>
                <CardDescription className="text-primary/80">Manage your password and account security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-primary mb-3">Change Password</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="current-password" className="text-primary/80">
                          Current Password
                        </Label>
                        <Input
                          id="current-password"
                          type="password"
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-password" className="text-primary/80">
                          New Password
                        </Label>
                        <Input
                          id="new-password"
                          type="password"
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password" className="text-primary/80">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <Button className="w-fit bg-green-600 hover:bg-primary/80">Update Password</Button>
                    </div>
                  </div>

                  <Separator className="bg-green-100" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-primary">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-primary/80">Secure your account with two-factor authentication</p>
                        <p className="text-sm text-green-600 mt-1">
                          Add an extra layer of security by requiring a verification code
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Separator className="bg-green-100" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-primary">Login Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-primary/80">Get notified when someone logs into your account</p>
                        <p className="text-sm text-green-600 mt-1">
                          We'll send you an alert when your account is accessed from a new device
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Separator className="bg-green-100" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-primary">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="bg-green-50 p-3 rounded-md border border-green-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-primary">Current Device</p>
                            <p className="text-sm text-green-600">Chrome on Android • Dhaka, Bangladesh</p>
                            <p className="text-xs text-green-500 mt-1">Active now</p>
                          </div>
                          <Button variant="outline" size="sm" className="border-green-200 text-primary/80">
                            Current
                          </Button>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-md border border-green-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-primary">Windows PC</p>
                            <p className="text-sm text-green-600">Firefox • Dhaka, Bangladesh</p>
                            <p className="text-xs text-green-500 mt-1">Last active: 2 days ago</p>
                          </div>
                          <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-green-100 shadow-sm mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-green-600 mr-2" />
                  <CardTitle className="text-primary">Notification Settings</CardTitle>
                </div>
                <CardDescription className="text-primary/80">
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-primary">Notification Channels</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary/80">Email Notifications</p>
                          <p className="text-sm text-green-600">Receive notifications via email</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary/80">SMS Notifications</p>
                          <p className="text-sm text-green-600">Receive notifications via SMS</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary/80">Push Notifications</p>
                          <p className="text-sm text-green-600">Receive notifications on your device</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-green-100" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-primary">Notification Types</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary/80">Weather Alerts</p>
                          <p className="text-sm text-green-600">Important weather updates for your farm</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary/80">Disease Outbreaks</p>
                          <p className="text-sm text-green-600">Alerts about crop disease outbreaks in your area</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary/80">Market Prices</p>
                          <p className="text-sm text-green-600">Updates on crop prices in your local market</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary/80">System Updates</p>
                          <p className="text-sm text-green-600">Information about new features and improvements</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary/80">Tips & Recommendations</p>
                          <p className="text-sm text-green-600">Farming tips and personalized recommendations</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="border-green-100 shadow-sm mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-green-600 mr-2" />
                  <CardTitle className="text-primary">Privacy Settings</CardTitle>
                </div>
                <CardDescription className="text-primary/80">
                  Control your privacy and data sharing preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-primary">Profile Visibility</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary/80">Show my profile to other farmers</p>
                          <p className="text-sm text-green-600">
                            Allow other farmers to see your profile and farming details
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary/80">Show my location on public maps</p>
                          <p className="text-sm text-green-600">Display your farm location on community maps</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-green-100" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-primary">Data Usage</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary/80">Share anonymous farming data for research</p>
                          <p className="text-sm text-green-600">
                            Help improve agricultural practices by sharing anonymized data
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary/80">Personalized recommendations</p>
                          <p className="text-sm text-green-600">
                            Receive tailored suggestions based on your farming data
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connected Accounts */}
            <Card className="border-green-100 shadow-sm mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-green-600 mr-2" />
                  <CardTitle className="text-primary">Connected Accounts</CardTitle>
                </div>
                <CardDescription className="text-primary/80">
                  Manage accounts connected to your Mati'r Sathi profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Facebook className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-primary font-medium">Facebook</p>
                        <p className="text-sm text-green-600">Connected as Rahim Ahmed</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                      Disconnect
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-primary font-medium">Phone Number</p>
                        <p className="text-sm text-green-600">Connected as +880 1234 567890</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-green-200 text-primary/80">
                      Verified
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-red-500 mr-3" />
                      <div>
                        <p className="text-primary font-medium">Google</p>
                        <p className="text-sm text-green-600">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="border-green-100 shadow-sm mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Download className="h-5 w-5 text-green-600 mr-2" />
                  <CardTitle className="text-primary">Data Management</CardTitle>
                </div>
                <CardDescription className="text-primary/80">Download your data or delete your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-primary mb-2">Download Your Data</h3>
                    <p className="text-primary/80 mb-4">
                      You can download a copy of all the data we have stored for your account.
                    </p>
                    <Button
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => {}}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Request Data Export
                    </Button>
                  </div>

                  <Separator className="bg-green-100" />

                  <div>
                    <h3 className="text-sm font-medium text-red-600 mb-2">Delete Account</h3>
                    <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        Deleting your account is permanent. All your data will be permanently removed and cannot be
                        recovered.
                      </AlertDescription>
                    </Alert>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="text-red-600">Confirm Account Deletion</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove all your
                            data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="delete-confirm" className="text-red-700">
                              Type "DELETE" to confirm
                            </Label>
                            <Input
                              id="delete-confirm"
                              className="border-red-200 focus:border-red-500 focus:ring-red-500"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="delete-password" className="text-red-700">
                              Enter your password
                            </Label>
                            <Input
                              id="delete-password"
                              type="password"
                              className="border-red-200 focus:border-red-500 focus:ring-red-500"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" className="border-gray-200 text-gray-700">
                            Cancel
                          </Button>
                          <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                            Delete Account
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
