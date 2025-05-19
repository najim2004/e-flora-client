"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Edit, Send, Paperclip, ImageIcon, Smile, Phone, Video, Info } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MessageSquare } from "lucide-react" // Import MessageSquare

// Sample conversations data
const conversations = [
  {
    id: "conv1",
    user: {
      id: "user2",
      name: "Karim Hossain",
      username: "karim_agro",
      avatar: "/placeholder.svg?height=40&width=40",
      occupation: "Vegetable Farmer",
      online: true,
    },
    lastMessage: {
      content: "আপনার পরামর্শের জন্য ধন্যবাদ। আমি ওই ছত্রাকনাশক ব্যবহার করব।",
      timestamp: "2023-05-15T14:30:00",
      isRead: false,
      sender: "user2",
    },
    unreadCount: 2,
  },
  {
    id: "conv2",
    user: {
      id: "user5",
      name: "Priya Mondal",
      username: "priya_organic",
      avatar: "/placeholder.svg?height=40&width=40",
      occupation: "Organic Farmer",
      online: true,
    },
    lastMessage: {
      content: "Hello! I wanted to ask about your farming techniques...",
      timestamp: "2023-05-15T12:15:00",
      isRead: true,
      sender: "user5",
    },
    unreadCount: 0,
  },
  {
    id: "conv3",
    user: {
      id: "user7",
      name: "Abdul Kadir",
      username: "abdul_agritech",
      avatar: "/placeholder.svg?height=40&width=40",
      occupation: "Agricultural Engineer",
      online: false,
    },
    lastMessage: {
      content: "Thanks for sharing the information about the irrigation system.",
      timestamp: "2023-05-14T18:45:00",
      isRead: true,
      sender: "user1", // current user
    },
    unreadCount: 0,
  },
  {
    id: "conv4",
    user: {
      id: "user3",
      name: "Fatima Begum",
      username: "fatima_crops",
      avatar: "/placeholder.svg?height=40&width=40",
      occupation: "Crop Specialist",
      online: false,
    },
    lastMessage: {
      content: "আপনার ফসলের ছবি দেখে মনে হচ্ছে এটি ব্লাস্ট রোগ। আপনি...",
      timestamp: "2023-05-13T09:20:00",
      isRead: true,
      sender: "user3",
    },
    unreadCount: 0,
  },
  {
    id: "conv5",
    user: {
      id: "user9",
      name: "Nasreen Akter",
      username: "nasreen_crops",
      avatar: "/placeholder.svg?height=40&width=40",
      occupation: "Crop Specialist",
      online: true,
    },
    lastMessage: {
      content: "I'll send you the details about organic pest control methods tomorrow.",
      timestamp: "2023-05-12T16:10:00",
      isRead: true,
      sender: "user9",
    },
    unreadCount: 0,
  },
]

// Sample messages for a conversation
const sampleMessages = [
  {
    id: "msg1",
    content: "Hello Karim! How are you doing today?",
    timestamp: "2023-05-15T10:15:00",
    sender: "user1", // current user
    isRead: true,
  },
  {
    id: "msg2",
    content: "ভাল আছি, ধন্যবাদ। আপনি কেমন আছেন? (I'm good, thank you. How are you?)",
    timestamp: "2023-05-15T10:18:00",
    sender: "user2",
    isRead: true,
  },
  {
    id: "msg3",
    content:
      "I'm doing well! I saw your post about the black spots on your rice plants. Have you tried any treatment yet?",
    timestamp: "2023-05-15T10:22:00",
    sender: "user1", // current user
    isRead: true,
  },
  {
    id: "msg4",
    content:
      "আমি কিছু ছত্রাকনাশক স্প্রে করার চেষ্টা করেছি, কিন্তু এখনও কোন ফলাফল দেখিনি। আপনি কি কোন পরামর্শ দিতে পারেন? (I've tried spraying some fungicides, but haven't seen any results yet. Can you suggest something?)",
    timestamp: "2023-05-15T10:30:00",
    sender: "user2",
    isRead: true,
  },
  {
    id: "msg5",
    content:
      "I would recommend using tricyclazole fungicide. It's very effective against rice blast disease. Apply it early in the morning or late afternoon for best results.",
    timestamp: "2023-05-15T10:35:00",
    sender: "user1", // current user
    isRead: true,
  },
  {
    id: "msg6",
    content:
      "আপনার পরামর্শের জন্য ধন্যবাদ। আমি ওই ছত্রাকনাশক ব্যবহার করব। (Thank you for your advice. I will use that fungicide.)",
    timestamp: "2023-05-15T14:30:00",
    sender: "user2",
    isRead: false,
  },
]

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messages, setMessages] = useState(sampleMessages)
  const [newMessage, setNewMessage] = useState("")

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: `msg${messages.length + 1}`,
        content: newMessage,
        timestamp: new Date().toISOString(),
        sender: "user1", // current user
        isRead: false,
      }

      setMessages([...messages, newMsg])
      setNewMessage("")
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden h-[calc(100vh-12rem)]">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 border-r border-green-100 flex flex-col">
              <div className="p-4 border-b border-green-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-green-800">Messages</h2>
                  <Button size="icon" variant="ghost" className="text-green-700 hover:bg-green-100">
                    <Edit className="h-5 w-5" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-9 border-green-200 focus:border-green-500 focus:ring-green-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-2">
                  {filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      className={`w-full text-left p-3 rounded-lg mb-1 flex items-start gap-3 ${
                        selectedConversation.id === conversation.id ? "bg-green-100" : "hover:bg-green-50"
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage
                            src={conversation.user.avatar || "/placeholder.svg"}
                            alt={conversation.user.name}
                          />
                          <AvatarFallback className="bg-green-200 text-green-700">
                            {conversation.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.user.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-green-800 truncate">{conversation.user.name}</h3>
                          <span className="text-xs text-green-600">
                            {formatDate(conversation.lastMessage.timestamp) === "Today"
                              ? formatTime(conversation.lastMessage.timestamp)
                              : formatDate(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                        <p
                          className={`text-sm truncate ${
                            conversation.unreadCount > 0 ? "font-medium text-green-800" : "text-green-600"
                          }`}
                        >
                          {conversation.lastMessage.sender === "user1" ? "You: " : ""}
                          {conversation.lastMessage.content}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-green-600">{conversation.user.occupation}</span>
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-green-600">{conversation.unreadCount}</Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Conversation */}
            <div className="hidden md:flex md:w-2/3 flex-col">
              {selectedConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b border-green-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={selectedConversation.user.avatar || "/placeholder.svg"}
                          alt={selectedConversation.user.name}
                        />
                        <AvatarFallback className="bg-green-200 text-green-700">
                          {selectedConversation.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/community/profile/${selectedConversation.user.id}`}
                            className="font-medium text-green-800 hover:underline"
                          >
                            {selectedConversation.user.name}
                          </Link>
                          {selectedConversation.user.online && <span className="text-xs text-green-600">Online</span>}
                        </div>
                        <p className="text-xs text-green-600">{selectedConversation.user.occupation}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="text-green-700 hover:bg-green-100">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-green-700 hover:bg-green-100">
                        <Video className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-green-700 hover:bg-green-100">
                        <Info className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user1" ? "justify-end" : "justify-start"}`}
                        >
                          {message.sender !== "user1" && (
                            <Avatar className="h-8 w-8 mr-2 mt-1">
                              <AvatarImage
                                src={selectedConversation.user.avatar || "/placeholder.svg"}
                                alt={selectedConversation.user.name}
                              />
                              <AvatarFallback className="bg-green-200 text-green-700 text-xs">
                                {selectedConversation.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                              message.sender === "user1" ? "bg-green-600 text-white" : "bg-green-100 text-green-800"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 text-right ${
                                message.sender === "user1" ? "text-green-100" : "text-green-600"
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t border-green-100">
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="text-green-700 hover:bg-green-100">
                        <Paperclip className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-green-700 hover:bg-green-100">
                        <ImageIcon className="h-5 w-5" /> {/* Updated Image to ImageIcon */}
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button size="icon" variant="ghost" className="text-green-700 hover:bg-green-100">
                        <Smile className="h-5 w-5" />
                      </Button>
                      <Button
                        size="icon"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-green-500 mx-auto mb-4" /> {/* Used MessageSquare */}
                    <h3 className="text-lg font-medium text-green-800 mb-2">No conversation selected</h3>
                    <p className="text-green-600">Select a conversation from the list to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
