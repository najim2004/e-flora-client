"use client";

import type React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  Users,
  MessageSquare,
  ImageIcon,
  Smile,
  Send,
  Bookmark,
  MapPin,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { CommunityPost } from "@/components/community-post";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample user data
const currentUser = {
  id: "user1",
  name: "Rahim Ahmed",
  username: "rahim_farmer",
  avatar: "/placeholder.svg?height=40&width=40",
  location: "Dhaka, Bangladesh",
  occupation: "Rice Farmer",
};

// Sample posts data
const samplePosts = [
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
    commentsList: [
      {
        id: "comment1",
        author: {
          id: "user3",
          name: "Fatima Begum",
          username: "fatima_crops",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content:
          "এটা ব্লাস্ট রোগ হতে পারে। ট্রাইসাইক্লাজোল ছত্রাকনাশক স্প্রে করুন। (This could be blast disease. Spray tricyclazole fungicide.)",
        createdAt: "2023-05-15T11:15:00",
        likes: 5,
      },
      {
        id: "comment2",
        author: {
          id: "user4",
          name: "Mohammad Ali",
          username: "ali_farmer",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content:
          "আমিও এই সমস্যা দেখেছি। আমি ইসোপ্রোথিওলেন ব্যবহার করেছি এবং এটা কাজ করেছে। (I've seen this problem too. I used isoprothiolane and it worked.)",
        createdAt: "2023-05-15T12:30:00",
        likes: 3,
      },
    ],
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
        content:
          "অসাধারণ! আপনি কি জৈব কীটনাশক ব্যবহার করেছেন? (Amazing! Did you use any organic pesticides?)",
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
    id: "post3",
    author: {
      id: "user7",
      name: "Abdul Kadir",
      username: "abdul_agritech",
      avatar: "/placeholder.svg?height=40&width=40",
      occupation: "Agricultural Engineer",
    },
    content:
      "আজ আমি একটি নতুন ড্রিপ ইরিগেশন সিস্টেম ইনস্টল করলাম যা ৪০% পানি সাশ্রয় করে। এই প্রযুক্তি আমাদের কৃষকদের জন্য গেম-চেঞ্জার হতে পারে, বিশেষ করে খরা প্রবণ এলাকায়।\n\nInstalled a new drip irrigation system today that saves 40% water. This technology could be a game-changer for our farmers, especially in drought-prone areas.",
    images: ["/placeholder.svg?height=300&width=500"],
    createdAt: "2023-05-13T16:20:00",
    likes: 78,
    comments: 15,
    shares: 23,
    saved: false,
    commentsList: [
      {
        id: "comment5",
        author: {
          id: "user8",
          name: "Sohel Khan",
          username: "sohel_farmer",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content:
          "এটার দাম কত? ছোট কৃষকদের জন্য সাশ্রয়ী কি? (How much does it cost? Is it affordable for small farmers?)",
        createdAt: "2023-05-13T17:05:00",
        likes: 8,
      },
      {
        id: "comment6",
        author: {
          id: "user7",
          name: "Abdul Kadir",
          username: "abdul_agritech",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content:
          "প্রাথমিক খরচ আছে, কিন্তু সরকারি সাবসিডি উপলব্ধ। ১-২ বছরে এটি নিজেই খরচ উঠিয়ে নেয়। (There is an initial cost, but government subsidies are available. It pays for itself in 1-2 years.)",
        createdAt: "2023-05-13T17:30:00",
        likes: 10,
      },
    ],
  },
];

// Sample trending topics
const trendingTopics = [
  { id: 1, name: "Rice Blast Disease", posts: 128 },
  { id: 2, name: "Organic Farming", posts: 96 },
  { id: 3, name: "Water Conservation", posts: 84 },
  { id: 4, name: "Fertilizer Prices", posts: 72 },
  { id: 5, name: "Climate Resilient Crops", posts: 65 },
];

// Sample active users
const activeUsers = [
  {
    id: "user2",
    name: "Karim Hossain",
    username: "karim_agro",
    avatar: "/placeholder.svg?height=40&width=40",
    occupation: "Vegetable Farmer",
  },
  {
    id: "user5",
    name: "Priya Mondal",
    username: "priya_organic",
    avatar: "/placeholder.svg?height=40&width=40",
    occupation: "Organic Farmer",
  },
  {
    id: "user7",
    name: "Abdul Kadir",
    username: "abdul_agritech",
    avatar: "/placeholder.svg?height=40&width=40",
    occupation: "Agricultural Engineer",
  },
  {
    id: "user9",
    name: "Nasreen Akter",
    username: "nasreen_crops",
    avatar: "/placeholder.svg?height=40&width=40",
    occupation: "Crop Specialist",
  },
  {
    id: "user10",
    name: "Jamal Uddin",
    username: "jamal_farmer",
    avatar: "/placeholder.svg?height=40&width=40",
    occupation: "Rice Farmer",
  },
];

// Sample upcoming events
const upcomingEvents = [
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
  {
    id: "event3",
    title: "Agricultural Technology Fair",
    date: "2023-06-10T09:00:00",
    location: "Khulna Convention Center",
    attendees: 120,
  },
];

export default function CommunityPage() {
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [posts, setPosts] = useState(samplePosts);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreatePost = () => {
    if (postContent.trim()) {
      const newPost = {
        id: `post${posts.length + 1}`,
        author: currentUser,
        content: postContent,
        images:
          selectedImages.length > 0
            ? ["/placeholder.svg?height=300&width=500"]
            : [],
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        saved: false,
        commentsList: [],
      };

      setPosts([newPost, ...posts]);
      setPostContent("");
      setSelectedImages([]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages([...selectedImages, ...filesArray]);
    }
  };

  const handleToggleSave = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, saved: !post.saved };
        }
        return post;
      })
    );
  };

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      })
    );
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full lg:w-1/4 space-y-6">
            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                    <AvatarImage
                      src={currentUser.avatar || "/placeholder.svg"}
                      alt={currentUser.name}
                    />
                    <AvatarFallback className="bg-green-200 text-primary/80">
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-primary">
                      {currentUser.name}
                    </h3>
                    <p className="text-sm text-primary">
                      @{currentUser.username}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-primary/80 hover:text-primary text-sm"
                  >
                    <span className="w-7 h-7 rounded-full bg-secondary/60 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </span>
                    <span>View Profile</span>
                  </Link>
                  <Link
                    href="/community/messages"
                    className="flex items-center gap-2 text-primary/80 hover:text-primary text-sm"
                  >
                    <span className="w-7 h-7 rounded-full bg-secondary/60 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </span>
                    <span>Messages</span>
                    <Badge className="ml-auto bg-primary hover:bg-primary/80">
                      3
                    </Badge>
                  </Link>
                  <Link
                    href="/community/saved"
                    className="flex items-center gap-2 text-primary/80 hover:text-primary text-sm"
                  >
                    <span className="w-7 h-7 rounded-full bg-secondary/60 flex items-center justify-center">
                      <Bookmark className="h-4 w-4 text-primary" />
                    </span>
                    <span>Saved Posts</span>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="font-medium text-primary">Trending Topics</h3>
                </div>
                <div className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className="flex items-center justify-between"
                    >
                      <Link
                        href={`/community/topics/${topic.id}`}
                        className="text-primary/80 hover:text-primary text-sm"
                      >
                        #{topic.name}
                      </Link>
                      <span className="text-xs text-primary/80">
                        {topic.posts} posts
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="font-medium text-primary">Upcoming Events</h3>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-b border-border pb-3 last:border-0 last:pb-0"
                    >
                      <Link
                        href={`/community/events/${event.id}`}
                        className="font-medium text-primary/80 hover:text-primary text-sm"
                      >
                        {event.title}
                      </Link>
                      <div className="flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3 text-primary/80" />
                        <span className="text-xs text-primary">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-primary/80" />
                        <span className="text-xs text-primary">
                          {event.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="link"
                  className="text-primary p-0 mt-3 text-sm"
                  asChild
                >
                  <Link href="/community/events">View All Events</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-2/4 space-y-6">
            {/* Create Post */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={currentUser.avatar || "/placeholder.svg"}
                      alt={currentUser.name}
                    />
                    <AvatarFallback className="bg-green-200 text-primary/80">
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <textarea
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent resize-none"
                      placeholder="Share something with the community..."
                      rows={3}
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    ></textarea>
                    {selectedImages.length > 0 && (
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {selectedImages.map((file, index) => (
                          <div
                            key={index}
                            className="relative w-16 h-16 bg-secondary/60 rounded-md flex items-center justify-center"
                          >
                            <ImageIcon className="h-6 w-6 text-primary" />
                            <button
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                              onClick={() =>
                                setSelectedImages(
                                  selectedImages.filter((_, i) => i !== index)
                                )
                              }
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between mt-3">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border text-primary/80 hover:bg-green-50"
                          onClick={() =>
                            document.getElementById("image-upload")?.click()
                          }
                        >
                          <ImageIcon className="h-4 w-4 mr-1" />
                          Photo
                        </Button>
                        <input
                          type="file"
                          id="image-upload"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border text-primary/80 hover:bg-green-50"
                        >
                          <Smile className="h-4 w-4 mr-1" />
                          Feeling
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/80"
                        onClick={handleCreatePost}
                        disabled={!postContent.trim()}
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feed Filters */}
            <div className="flex justify-between items-center">
              <Tabs defaultValue="latest" className="w-full">
                <TabsList className="bg-secondary/60">
                  <TabsTrigger
                    value="latest"
                    className="data-[state=active]:bg-white data-[state=active]:text-primary"
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Latest
                  </TabsTrigger>
                  <TabsTrigger
                    value="popular"
                    className="data-[state=active]:bg-white data-[state=active]:text-primary"
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Popular
                  </TabsTrigger>
                  <TabsTrigger
                    value="following"
                    className="data-[state=active]:bg-white data-[state=active]:text-primary"
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Following
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                variant="outline"
                size="sm"
                className="border-border text-primary/80 hover:bg-green-50 ml-2"
              >
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <CommunityPost
                    key={post.id}
                    post={post}
                    onToggleSave={() => handleToggleSave(post.id)}
                    onLike={() => handleLikePost(post.id)}
                  />
                ))
              ) : (
                <Card className="border-border shadow-sm">
                  <CardContent className="p-6 text-center">
                    <p className="text-primary/80">
                      No posts found. Be the first to post!
                    </p>
                  </CardContent>
                </Card>
              )}
              <div className="text-center">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-green-50"
                >
                  Load More
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-1/4 space-y-6">
            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/80" />
                  <Input
                    placeholder="Search posts, topics, users..."
                    className="pl-9 border-border focus:border-primary/80 focus:ring-primary/80"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="font-medium text-primary">Active Users</h3>
                  </div>
                  <Button
                    variant="link"
                    className="text-primary p-0 text-sm"
                    asChild
                  >
                    <Link href="/community/users">See All</Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {activeUsers.map((user) => (
                    <Link
                      href={`/community/profile/${user.id}`}
                      key={user.id}
                      className="flex items-center gap-3"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback className="bg-green-200 text-primary/80 text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-primary truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-primary truncate">
                          {user.occupation}
                        </p>
                      </div>
                      <div className="w-2 h-2 bg-primary/80 rounded-full"></div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h3 className="font-medium text-primary">Recent Messages</h3>
                </div>
                <ScrollArea className="h-[250px] pr-4">
                  <div className="space-y-4">
                    {activeUsers.map((user) => (
                      <Link
                        href={`/community/messages/${user.id}`}
                        key={user.id}
                        className="flex items-start gap-3"
                      >
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                          />
                          <AvatarFallback className="bg-green-200 text-primary/80 text-xs">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-primary">
                              {user.name}
                            </p>
                            <p className="text-xs text-primary/80">2h ago</p>
                          </div>
                          <p className="text-xs text-primary line-clamp-2">
                            {user.id === "user2"
                              ? "আপনার পরামর্শের জন্য ধন্যবাদ। আমি ওই ছত্রাকনাশক ব্যবহার করব।"
                              : "Hello! I wanted to ask about your farming techniques..."}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
                <Separator className="my-4 bg-secondary/60" />
                <Button
                  className="w-full bg-primary hover:bg-primary/80"
                  asChild
                >
                  <Link href="/community/messages">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View All Messages
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-medium text-primary mb-4">
                  Community Guidelines
                </h3>
                <ul className="space-y-2 text-sm text-primary/80">
                  <li>• Be respectful to other community members</li>
                  <li>• Share accurate and helpful information</li>
                  <li>• Do not spam or post promotional content</li>
                  <li>• Use appropriate language and tone</li>
                  <li>• Report any harmful or inappropriate content</li>
                </ul>
                <Button
                  variant="link"
                  className="text-primary p-0 mt-2 text-sm"
                >
                  Read Full Guidelines
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
