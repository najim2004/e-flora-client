"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, ThumbsUp, MessageCircle, Share2, Bookmark, BookmarkCheck, Send } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Author {
  id: string
  name: string
  username: string
  avatar: string
  occupation?: string
}

interface Comment {
  id: string
  author: Author
  content: string
  createdAt: string
  likes: number
}

interface Post {
  id: string
  author: Author
  content: string
  images: string[]
  createdAt: string
  likes: number
  comments: number
  shares: number
  saved: boolean
  commentsList: Comment[]
}

interface CommunityPostProps {
  post: Post
  onToggleSave: () => void
  onLike: () => void
}

export function CommunityPost({ post, onToggleSave, onLike }: CommunityPostProps) {
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState(post.commentsList)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInSeconds < 60) {
      return "just now"
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }
  }

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: `comment${comments.length + 1}`,
        author: {
          id: "user1",
          name: "Rahim Ahmed",
          username: "rahim_farmer",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content: commentText,
        createdAt: new Date().toISOString(),
        likes: 0,
      }

      setComments([...comments, newComment])
      setCommentText("")
    }
  }

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 }
        }
        return comment
      }),
    )
  }

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="flex items-center justify-between p-4">
          <Link href={`/community/profile/${post.author.id}`} className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback className="bg-muted text-secondary-foreground">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-foreground">{post.author.name}</h3>
                {post.author.occupation && (
                  <Badge className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/20">{post.author.occupation}</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</p>
            </div>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-secondary-foreground hover:bg-secondary/10">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save Post</DropdownMenuItem>
              <DropdownMenuItem>Report Post</DropdownMenuItem>
              <DropdownMenuItem>Hide Post</DropdownMenuItem>
              <DropdownMenuItem>Follow {post.author.name}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-4">
          <div className="whitespace-pre-wrap text-foreground">{post.content}</div>
        </div>

        {/* Post Images */}
        {post.images.length > 0 && (
          <div className={`grid ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-1`}>
            {post.images.map((image, index) => (
              <div
                key={index}
                className={`${
                  post.images.length === 1 ? "col-span-1" : index === 0 && post.images.length === 3 ? "col-span-2" : ""
                }`}
              >
                <img src={image || "/placeholder.svg"} alt="Post image" className="w-full h-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Post Stats */}
        <div className="px-4 py-2 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes} likes</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-secondary-foreground" onClick={() => setShowComments(!showComments)}>
              {post.comments + comments.length - post.commentsList.length} comments
            </button>
            <span>{post.shares} shares</span>
          </div>
        </div>

        {/* Post Actions */}
        <div className="px-4 py-2 border-t border-b border-border flex justify-between">
          <Button
            variant="ghost"
            className="flex-1 text-secondary-foreground hover:bg-secondary/10 hover:text-secondary"
            onClick={onLike}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Like
          </Button>
          <Button
            variant="ghost"
            className="flex-1 text-secondary-foreground hover:bg-secondary/10 hover:text-secondary"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" className="flex-1 text-secondary-foreground hover:bg-secondary/10 hover:text-secondary">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="ghost"
            className="flex-1 text-secondary-foreground hover:bg-secondary/10 hover:text-secondary"
            onClick={onToggleSave}
          >
            {post.saved ? (
              <BookmarkCheck className="h-4 w-4 mr-2 fill-primary" />
            ) : (
              <Bookmark className="h-4 w-4 mr-2" />
            )}
            {post.saved ? "Saved" : "Save"}
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="px-4 py-3">
            {/* Add Comment */}
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=30&width=30" alt="Your Avatar" />
                <AvatarFallback className="bg-muted text-secondary-foreground text-xs">RA</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Write a comment..."
                  className="border-input focus:border-primary focus:ring-primary/50"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleAddComment()
                    }
                  }}
                />
                <Button
                  size="icon"
                  className="bg-primary hover:bg-primary/80"
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                    <AvatarFallback className="bg-muted text-secondary-foreground text-xs">
                      {comment.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-card rounded-lg px-3 py-2">
                      <Link
                        href={`/community/profile/${comment.author.id}`}
                        className="font-medium text-foreground text-sm"
                      >
                        {comment.author.name}
                      </Link>
                      <p className="text-secondary-foreground text-sm">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <button className="hover:text-secondary-foreground" onClick={() => handleLikeComment(comment.id)}>
                        Like ({comment.likes})
                      </button>
                      <button className="hover:text-secondary-foreground">Reply</button>
                      <span>{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
