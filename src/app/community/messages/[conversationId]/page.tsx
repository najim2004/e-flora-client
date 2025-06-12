"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Paperclip, ImageIcon, Smile, Phone, Video, Info } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

// Sample conversation data
const conversationData = {
  id: "conv1",
  user: {
    id: "user2",
    name: "Karim Hossain",
    username: "karim_agro",
    avatar: "/placeholder.svg?height=40&width=40",
    occupation: "Vegetable Farmer",
    online: true,
  },
  messages: [
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
      isRead: false,
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
  ],
}

export default function ConversationPage({ params }: { params: { conversationId: string } }) {
  const [messages, setMessages] = useState(conversationData.messages)
  const [newMessage, setNewMessage] = useState("")

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

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden h-[calc(100vh-12rem)]">
          <div className="flex flex-col h-full">
            {/* Conversation Header */}
            <div className="p-4 border-b border-green-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Link href="/community/messages" className="text-primary/80 hover:text-green-600">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <Avatar>
                  <AvatarImage
                    src={conversationData.user.avatar || "/placeholder.svg"}
                    alt={conversationData.user.name}
                  />
                  <AvatarFallback className="bg-green-200 text-primary/80">
                    {conversationData.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/community/profile/${conversationData.user.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {conversationData.user.name}
                    </Link>
                    {conversationData.user.online && <span className="text-xs text-green-600">Online</span>}
                  </div>
                  <p className="text-xs text-green-600">{conversationData.user.occupation}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" className="text-primary/80 hover:bg-green-100">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-primary/80 hover:bg-green-100">
                  <Video className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-primary/80 hover:bg-green-100">
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
                          src={conversationData.user.avatar || "/placeholder.svg"}
                          alt={conversationData.user.name}
                        />
                        <AvatarFallback className="bg-green-200 text-primary/80 text-xs">
                          {conversationData.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.sender === "user1" ? "bg-green-600 text-white" : "bg-green-100 text-primary"
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
                <Button size="icon" variant="ghost" className="text-primary/80 hover:bg-green-100">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-primary/80 hover:bg-green-100">
                  <ImageIcon className="h-5 w-5" />
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
                <Button size="icon" variant="ghost" className="text-primary/80 hover:bg-green-100">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  className="bg-green-600 hover:bg-primary/80"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
