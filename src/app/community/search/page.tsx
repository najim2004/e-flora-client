"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Users, MessageSquare, Hash, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommunityPost } from "@/components/community-post"
import Link from "next/link"

// Sample search results
const searchResults = {
  posts: [
    {
      id: "post1",
      author: {
        id: "user2",
        name: "Karim Hossain",
        username: "karim_agro",
        avatar: "/placeholder.svg?height=40&width=40",
        occupation: "Vegetable Farmer",
      },
      content:
        "আমার ধান ক্ষেতে এই কালো দাগ দেখা যাচ্ছে। কেউ কি বলতে পারেন এটা কি রোগ? কিভাবে এটা থেকে ফসল বাঁচাতে পারি?\n\nI'm seeing these black spots in my rice field. Can anyone tell me what disease this is? How can I save my crop?",
      images: ["/placeholder.svg?height=300&width=500"],
      createdAt: "2023-05-15T10:30:00",
      likes: 24,
      comments: 8,
      shares: 3,
      saved: false,
      commentsList: [],
    },
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
      images: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
      createdAt: "2023-05-14T09:45:00",
      likes: 56,
      comments: 12,
      shares: 7,
      saved: true,
      commentsList: [],
    },
  ],
  users: [
    {
      id: "user2",
      name: "Karim Hossain",
      username: "karim_agro",
      avatar: "/placeholder.svg?height=40&width=40",
      occupation: "Vegetable Farmer",
      followers: 156,
    },
    {
      id: "user5",
      name: "Priya Mondal",
      username: "priya_organic",
      avatar: "/placeholder.svg?height=40&width=40",
      occupation: "Organic Farmer",
      followers: 245,
    },
    {
      id: "user7",
      name: "Abdul Kadir",
      username: "abdul_agritech",
      avatar: "/placeholder.svg?height=40&width=40",
      occupation: "Agricultural Engineer",
      followers: 312,
    },
  ],
  topics: [
    { id: 1, name: "Rice Blast Disease", posts: 128 },
    { id: 2, name: "Organic Farming", posts: 96 },
    { id: 3, name: "Water Conservation", posts: 84 },
  ],
  events: [
    {
      id: "event1",
      title: "Organic Farming Workshop",
      date: "2023-05-25T10:00:00",
      location: "Dhaka Agricultural Center",
      attendees: 45,
    },
    {
      id: "event2",
      title: "Crop Disease Prevention Seminar",
      date: "2023-06-02T14:00:00",
      location: "Rajshahi University",
      attendees: 32,
    },
  ],
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState(searchResults.posts)

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
      

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-primary mb-6">Search Community</h1>

          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
              <Input
                placeholder="Search posts, users, topics, events..."
                className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-green-100 w-full">
              <TabsTrigger
                value="all"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                All Results
              </TabsTrigger>
              <TabsTrigger
                value="posts"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                <Users className="h-4 w-4 mr-1" />
                Users
              </TabsTrigger>
              <TabsTrigger
                value="topics"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                <Hash className="h-4 w-4 mr-1" />
                Topics
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6 space-y-8">
              {/* Posts */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-primary">Posts</h2>
                  <Button variant="link" className="text-green-600 p-0" asChild>
                    <Link href="/community/search?tab=posts">See All</Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {posts.slice(0, 1).map((post) => (
                    <CommunityPost
                      key={post.id}
                      post={post}
                      onToggleSave={() => handleToggleSave(post.id)}
                      onLike={() => handleLikePost(post.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Users */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-primary">Users</h2>
                  <Button variant="link" className="text-green-600 p-0" asChild>
                    <Link href="/community/search?tab=users">See All</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.users.slice(0, 2).map((user) => (
                    <Link href={`/community/profile/${user.id}`} key={user.id}>
                      <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback className="bg-green-200 text-primary/80">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-medium text-primary">{user.name}</h3>
                            <p className="text-sm text-green-600">@{user.username}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className="bg-green-100 text-primary/80 hover:bg-green-200">
                                {user.occupation}
                              </Badge>
                              <span className="text-xs text-green-600">{user.followers} followers</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Topics */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-primary">Topics</h2>
                  <Button variant="link" className="text-green-600 p-0" asChild>
                    <Link href="/community/search?tab=topics">See All</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {searchResults.topics.map((topic) => (
                    <Link href={`/community/topics/${topic.id}`} key={topic.id}>
                      <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Hash className="h-5 w-5 text-green-600" />
                            <h3 className="font-medium text-primary">{topic.name}</h3>
                          </div>
                          <p className="text-sm text-green-600">{topic.posts} posts</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Events */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-primary">Events</h2>
                  <Button variant="link" className="text-green-600 p-0" asChild>
                    <Link href="/community/search?tab=events">See All</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.events.map((event) => (
                    <Link href={`/community/events/${event.id}`} key={event.id}>
                      <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <h3 className="font-medium text-primary">{event.title}</h3>
                          <div className="flex items-center gap-1 mt-2">
                            <Calendar className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Users className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">{event.attendees} attending</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="posts" className="mt-6">
              <div className="space-y-6">
                {posts.map((post) => (
                  <CommunityPost
                    key={post.id}
                    post={post}
                    onToggleSave={() => handleToggleSave(post.id)}
                    onLike={() => handleLikePost(post.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.users.map((user) => (
                  <Link href={`/community/profile/${user.id}`} key={user.id}>
                    <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-green-200 text-primary/80">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium text-primary">{user.name}</h3>
                          <p className="text-sm text-green-600">@{user.username}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-green-100 text-primary/80 hover:bg-green-200">{user.occupation}</Badge>
                            <span className="text-xs text-green-600">{user.followers} followers</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="topics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {searchResults.topics.map((topic) => (
                  <Link href={`/community/topics/${topic.id}`} key={topic.id}>
                    <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Hash className="h-5 w-5 text-green-600" />
                          <h3 className="font-medium text-primary">{topic.name}</h3>
                        </div>
                        <p className="text-sm text-green-600">{topic.posts} posts</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.events.map((event) => (
                  <Link href={`/community/events/${event.id}`} key={event.id}>
                    <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h3 className="font-medium text-primary">{event.title}</h3>
                        <div className="flex items-center gap-1 mt-2">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Users className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">{event.attendees} attending</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
