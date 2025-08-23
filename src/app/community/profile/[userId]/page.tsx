"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, Mail, Phone, MessageSquare, Users, LinkIcon, ExternalLink } from "lucide-react"
import { CommunityPost } from "@/components/community-post"

// Sample user data
const userData = {
  id: "user5",
  name: "Priya Mondal",
  username: "priya_organic",
  avatar: "/placeholder.svg?height=120&width=120",
  coverImage: "/placeholder.svg?height=300&width=1200",
  occupation: "Organic Farmer",
  location: "West Bengal, India",
  bio: "Passionate organic farmer specializing in sustainable agriculture practices. Growing vegetables and fruits without chemicals for over 10 years. Advocate for natural farming methods and biodiversity conservation.",
  joinedDate: "2022-03-15T00:00:00",
  email: "priya.mondal@example.com",
  phone: "+91 9876543210",
  website: "www.priyaorganics.com",
  followers: 245,
  following: 132,
  posts: 87,
}

// Sample posts data
const userPosts = [
  {
    id: "post2",
    author: {
      id: "user5",
      name: "Priya Mondal",
      username: "priya_organic",
      avatar: "/placeholder.svg?height=40&width=40",
      occupation: "Organic Farmer",
    },
    content:
      "আজ আমার জৈব সবজি বাগানে প্রথম ফসল কাটলাম! এই প্রাকৃতিক পদ্ধতিতে চাষ করে খুব খুশি। কোন রাসায়নিক সার ছাড়াই এত সুন্দর ফসল!\n\nHarvested my first crop from my organic vegetable garden today! So happy with these natural farming methods. Such beautiful produce without any chemical fertilizers!",
    images: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    createdAt: "2023-05-14T09:45:00",
    likes: 56,
    comments: 12,
    shares: 7,
    saved: true,
    commentsList: [
      {
        id: "comment3",
        author: {
          id: "user6",
          name: "Rahul Das",
          username: "rahul_farmer",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content: "অসাধারণ! আপনি কি জৈব কীটনাশক ব্যবহার করেছেন? (Amazing! Did you use any organic pesticides?)",
        createdAt: "2023-05-14T10:20:00",
        likes: 2,
      },
      {
        id: "comment4",
        author: {
          id: "user5",
          name: "Priya Mondal",
          username: "priya_organic",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content:
          "হ্যাঁ, আমি নিম তেল এবং লবণ পানির মিশ্রণ ব্যবহার করেছি। খুব কার্যকর! (Yes, I used a mixture of neem oil and salt water. Very effective!)",
        createdAt: "2023-05-14T10:45:00",
        likes: 4,
      },
    ],
  },
  {
    id: "post4",
    author: {
      id: "user5",
      name: "Priya Mondal",
      username: "priya_organic",
      avatar: "/placeholder.svg?height=40&width=40",
      occupation: "Organic Farmer",
    },
    content:
      "আজ আমি একটি জৈব সার তৈরির ওয়ার্কশপে অংশগ্রহণ করলাম। কম্পোস্টিং এবং ভার্মিকম্পোস্টিং সম্পর্কে অনেক কিছু শিখলাম। এখানে কিছু টিপস শেয়ার করছি।\n\nAttended an organic fertilizer workshop today. Learned a lot about composting and vermicomposting. Sharing some tips here.",
    images: ["/placeholder.svg?height=300&width=500"],
    createdAt: "2023-05-05T14:30:00",
    likes: 42,
    comments: 9,
    shares: 15,
    saved: false,
    commentsList: [
      {
        id: "comment7",
        author: {
          id: "user8",
          name: "Sohel Khan",
          username: "sohel_farmer",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content:
          "খুব উপকারী তথ্য! আপনি কি আরও বিস্তারিত শেয়ার করতে পারেন? (Very helpful information! Can you share more details?)",
        createdAt: "2023-05-05T15:10:00",
        likes: 2,
      },
    ],
  },
  {
    id: "post5",
    author: {
      id: "user5",
      name: "Priya Mondal",
      username: "priya_organic",
      avatar: "/placeholder.svg?height=40&width=40",
      occupation: "Organic Farmer",
    },
    content:
      "জৈব চাষের জন্য সেরা ৫টি ফসল রোটেশন পদ্ধতি সম্পর্কে আমার নতুন ব্লগ পোস্ট পড়ুন। লিংক কমেন্টে দিচ্ছি।\n\nCheck out my new blog post about the top 5 crop rotation methods for organic farming. Link in comments.",
    images: [],
    createdAt: "2023-04-28T11:15:00",
    likes: 38,
    comments: 14,
    shares: 12,
    saved: false,
    commentsList: [
      {
        id: "comment8",
        author: {
          id: "user5",
          name: "Priya Mondal",
          username: "priya_organic",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content: "Blog link: www.priyaorganics.com/crop-rotation-methods",
        createdAt: "2023-04-28T11:16:00",
        likes: 0,
      },
    ],
  },
]

// Sample photos
const userPhotos = [
  "/placeholder.svg?height=200&width=200",
  "/placeholder.svg?height=200&width=200",
  "/placeholder.svg?height=200&width=200",
  "/placeholder.svg?height=200&width=200",
  "/placeholder.svg?height=200&width=200",
  "/placeholder.svg?height=200&width=200",
  "/placeholder.svg?height=200&width=200",
  "/placeholder.svg?height=200&width=200",
  "/placeholder.svg?height=200&width=200",
]

// Sample followers
const followers = [
  {
    id: "user1",
    name: "Rahim Ahmed",
    username: "rahim_farmer",
    avatar: "/placeholder.svg?height=50&width=50",
    occupation: "Rice Farmer",
  },
  {
    id: "user2",
    name: "Karim Hossain",
    username: "karim_agro",
    avatar: "/placeholder.svg?height=50&width=50",
    occupation: "Vegetable Farmer",
  },
  {
    id: "user3",
    name: "Fatima Begum",
    username: "fatima_crops",
    avatar: "/placeholder.svg?height=50&width=50",
    occupation: "Crop Specialist",
  },
  {
    id: "user4",
    name: "Mohammad Ali",
    username: "ali_farmer",
    avatar: "/placeholder.svg?height=50&width=50",
    occupation: "Wheat Farmer",
  },
]

export default function UserProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false)
  const [posts, setPosts] = useState(userPosts)

  const handleToggleSave = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, saved: !post.saved }
        }
        return post
      }),
    )
  }

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 }
        }
        return post
      }),
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <main className="flex-1">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 bg-secondary/60 overflow-hidden">
          <img
            src={userData.coverImage || "/placeholder.svg"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Link
              href="/community"
              className="bg-white/80 backdrop-blur-sm text-primary/80 hover:bg-white/90 rounded-full p-2 flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="text-sm">Back</span>
            </Link>
          </div>
        </div>

        {/* Profile Header */}
        <div className="max-w-7xl w-full mx-auto px-4">
          <div className="relative -mt-16 mb-4 flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                <AvatarImage
                  src={userData.avatar || "/placeholder.svg"}
                  alt={userData.name}
                />
                <AvatarFallback className="bg-secondary/60 text-primary/80 text-4xl">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="mt-2 md:mt-0 md:mb-2">
                <h1 className="text-2xl font-bold text-primary">
                  {userData.name}
                </h1>
                <div className="flex items-center gap-2 text-primary">
                  <span>@{userData.username}</span>
                  <Badge className="bg-secondary/60 text-primary/80 hover:bg-secondary/60">
                    {userData.occupation}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1 text-primary text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{userData.location}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button
                className={
                  isFollowing
                    ? "bg-secondary/60 text-primary/80 hover:bg-secondary/60"
                    : "bg-primary hover:bg-primary/80"
                }
                onClick={() => setIsFollowing(!isFollowing)}
              >
                <Users className="h-4 w-4 mr-2" />
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-green-50"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Left Sidebar */}
            <div className="space-y-6">
              {/* About */}
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-primary text-lg">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary/80">{userData.bio}</p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2 text-primary text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {formatDate(userData.joinedDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary text-sm">
                      <Mail className="h-4 w-4" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary text-sm">
                      <Phone className="h-4 w-4" />
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary text-sm">
                      <LinkIcon className="h-4 w-4" />
                      <a
                        href={`https://${userData.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary/80 flex items-center"
                      >
                        {userData.website}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Photos */}
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-primary text-lg">Photos</CardTitle>
                  <Button variant="link" className="text-primary p-0" asChild>
                    <Link href={`/community/profile/${userData.id}/photos`}>
                      See All
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {userPhotos.slice(0, 9).map((photo, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-secondary/60 rounded-md overflow-hidden"
                      >
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Followers */}
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-primary text-lg">
                    Followers
                  </CardTitle>
                  <Button variant="link" className="text-primary p-0" asChild>
                    <Link href={`/community/profile/${userData.id}/followers`}>
                      See All
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {followers.slice(0, 4).map((follower) => (
                      <Link
                        href={`/community/profile/${follower.id}`}
                        key={follower.id}
                        className="flex items-center gap-3"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={follower.avatar || "/placeholder.svg"}
                            alt={follower.name}
                          />
                          <AvatarFallback className="bg-secondary/60 text-primary/80">
                            {follower.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-primary">
                            {follower.name}
                          </p>
                          <p className="text-xs text-primary">
                            {follower.occupation}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 text-center text-sm text-primary">
                    <span>
                      {userData.followers} followers • {userData.following}{" "}
                      following
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <Tabs defaultValue="posts" className="w-full">
                <TabsList className="bg-secondary/60 w-full">
                  <TabsTrigger
                    value="posts"
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary text-gray-500"
                  >
                    Posts
                  </TabsTrigger>
                  <TabsTrigger
                    value="about"
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary text-gray-500"
                  >
                    About
                  </TabsTrigger>
                  <TabsTrigger
                    value="photos"
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary text-gray-500"
                  >
                    Photos
                  </TabsTrigger>
                  <TabsTrigger
                    value="followers"
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary text-gray-500"
                  >
                    Followers
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="mt-6 space-y-6">
                  {posts.map((post) => (
                    <CommunityPost
                      key={post.id}
                      post={post}
                      onToggleSave={() => handleToggleSave(post.id)}
                      onLike={() => handleLikePost(post.id)}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="about" className="mt-6">
                  <Card className="border-border shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="font-medium text-primary mb-3">
                        Biography
                      </h3>
                      <p className="text-primary/80 mb-6">{userData.bio}</p>

                      <h3 className="font-medium text-primary mb-3">
                        Contact Information
                      </h3>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-primary">
                          <Mail className="h-5 w-5" />
                          <span>{userData.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <Phone className="h-5 w-5" />
                          <span>{userData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <LinkIcon className="h-5 w-5" />
                          <a
                            href={`https://${userData.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary/80 flex items-center"
                          >
                            {userData.website}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      </div>

                      <h3 className="font-medium text-primary mb-3">
                        Basic Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                          <MapPin className="h-5 w-5" />
                          <span>Lives in {userData.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <Calendar className="h-5 w-5" />
                          <span>Joined {formatDate(userData.joinedDate)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="photos" className="mt-6">
                  <Card className="border-border shadow-sm">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {userPhotos.map((photo, index) => (
                          <div
                            key={index}
                            className="aspect-square bg-secondary/60 rounded-md overflow-hidden"
                          >
                            <img
                              src={photo || "/placeholder.svg"}
                              alt={`Photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="followers" className="mt-6">
                  <Card className="border-border shadow-sm">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {followers.map((follower) => (
                          <Link
                            href={`/community/profile/${follower.id}`}
                            key={follower.id}
                          >
                            <div className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-green-50">
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={follower.avatar || "/placeholder.svg"}
                                  alt={follower.name}
                                />
                                <AvatarFallback className="bg-secondary/60 text-primary/80">
                                  {follower.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-primary">
                                  {follower.name}
                                </p>
                                <p className="text-sm text-primary">
                                  {follower.occupation}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
