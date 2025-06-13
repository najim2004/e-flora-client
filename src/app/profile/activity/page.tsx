"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Sprout,
  MessageSquare,
  User,
  Settings,
  Download,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProfileSidebar } from "@/components/profile-sidebar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ActivityHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<string[]>([
    "disease-detection",
    "crop-suggestion",
    "chatbot",
    "account",
  ]);

  // Sample activity data
  const activities = [
    {
      id: 1,
      type: "disease-detection",
      title: "Rice Blast Disease Detected",
      description:
        "You detected Rice Blast disease in your crop with 85% confidence",
      date: "2023-05-15T10:30:00",
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      details: {
        confidence: "85%",
        treatment: "Applied fungicide containing tricyclazole",
        location: "North Field",
      },
    },
    {
      id: 2,
      type: "crop-suggestion",
      title: "Crop Recommendations Received",
      description:
        "You received personalized crop recommendations for your farm",
      date: "2023-05-10T14:45:00",
      icon: <Sprout className="h-5 w-5 text-primary" />,
      details: {
        topRecommendation: "Rice (Boro)",
        matchPercentage: "95%",
        otherOptions: ["Jute", "Mustard"],
      },
    },
    {
      id: 3,
      type: "chatbot",
      title: "AI Chatbot Conversation",
      description:
        "You asked about fertilizer recommendations for rice cultivation",
      date: "2023-05-08T09:15:00",
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
      details: {
        question: "What is the best fertilizer for rice cultivation?",
        answer:
          "For optimal rice cultivation, use a balanced NPK fertilizer with a ratio of 4:2:1...",
      },
    },
    {
      id: 4,
      type: "account",
      title: "Profile Updated",
      description: "You updated your profile information",
      date: "2023-05-05T16:20:00",
      icon: <User className="h-5 w-5 text-purple-500" />,
      details: {
        changedFields: ["Phone Number", "Farm Size", "Soil Type"],
      },
    },
    {
      id: 5,
      type: "disease-detection",
      title: "Bacterial Leaf Blight Detected",
      description:
        "You detected Bacterial Leaf Blight in your crop with 78% confidence",
      date: "2023-04-28T11:10:00",
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      details: {
        confidence: "78%",
        treatment: "Applied copper-based bactericide",
        location: "East Field",
      },
    },
    {
      id: 6,
      type: "account",
      title: "Password Changed",
      description: "You changed your account password",
      date: "2023-04-25T08:30:00",
      icon: <Settings className="h-5 w-5 text-gray-500" />,
      details: {
        device: "Android Mobile",
        location: "Dhaka, Bangladesh",
      },
    },
    {
      id: 7,
      type: "crop-suggestion",
      title: "Seasonal Planting Guide Downloaded",
      description: "You downloaded the seasonal planting guide for Summer 2023",
      date: "2023-04-20T13:45:00",
      icon: <Download className="h-5 w-5 text-primary" />,
      details: {
        fileType: "PDF",
        fileSize: "2.4 MB",
        season: "Summer 2023",
      },
    },
    {
      id: 8,
      type: "chatbot",
      title: "AI Chatbot Conversation",
      description: "You asked about pest control for rice crops",
      date: "2023-04-18T15:30:00",
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
      details: {
        question: "How can I control stem borer in my rice field?",
        answer:
          "To control stem borers in rice, you can use integrated pest management approaches including...",
      },
    },
    {
      id: 9,
      type: "account",
      title: "Account Created",
      description: "You created your Mati'r Sathi account",
      date: "2023-04-15T09:00:00",
      icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
      details: {
        method: "Email Registration",
        device: "Windows PC",
        location: "Dhaka, Bangladesh",
      },
    },
    {
      id: 10,
      type: "disease-detection",
      title: "No Disease Detected",
      description: "Your crop scan showed no signs of disease",
      date: "2023-04-10T14:20:00",
      icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
      details: {
        cropType: "Rice",
        scanArea: "West Field",
        recommendation: "Continue regular monitoring",
      },
    },
  ];

  // Filter activities based on search query and selected types
  const filteredActivities = activities.filter(
    (activity) =>
      selectedActivityTypes.includes(activity.type) &&
      (searchQuery === "" ||
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Group activities by date
  const groupedActivities: Record<string, typeof activities> = {};
  filteredActivities.forEach((activity) => {
    const date = new Date(activity.date);
    const dateKey = date.toISOString().split("T")[0];

    if (!groupedActivities[dateKey]) {
      groupedActivities[dateKey] = [];
    }

    groupedActivities[dateKey].push(activity);
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get activity type badge
  const getActivityTypeBadge = (type: string) => {
    switch (type) {
      case "disease-detection":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">
            Disease Detection
          </Badge>
        );
      case "crop-suggestion":
        return (
          <Badge className="bg-secondary/60 text-primary/80 hover:bg-green-200">
            Crop Suggestion
          </Badge>
        );
      case "chatbot":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
            AI Chatbot
          </Badge>
        );
      case "account":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
            Account
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
            Other
          </Badge>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/3">
            <ProfileSidebar activeItem="activity" />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  Activity History
                </h1>
                <p className="text-primary">
                  Track all your activities on Mati&#39;r Sathi
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-green-50"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {showFilters ? (
                    <ChevronUp className="h-4 w-4 ml-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-2" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-green-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <Card className="border-border shadow-sm mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/80" />
                    <Input
                      placeholder="Search activities..."
                      className="pl-9 border-border focus:border-primary/80 focus:ring-primary/80"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all-time">
                      <SelectTrigger className="w-[180px] border-border focus:border-primary/80 focus:ring-primary/80">
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Time Period</SelectLabel>
                          <SelectItem value="all-time">All Time</SelectItem>
                          <SelectItem value="last-week">Last Week</SelectItem>
                          <SelectItem value="last-month">Last Month</SelectItem>
                          <SelectItem value="last-3-months">
                            Last 3 Months
                          </SelectItem>
                          <SelectItem value="last-year">Last Year</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {showFilters && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <h3 className="text-sm font-medium text-primary mb-3">
                      Filter by Activity Type
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="disease-detection"
                          checked={selectedActivityTypes.includes(
                            "disease-detection"
                          )}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedActivityTypes([
                                ...selectedActivityTypes,
                                "disease-detection",
                              ]);
                            } else {
                              setSelectedActivityTypes(
                                selectedActivityTypes.filter(
                                  (type) => type !== "disease-detection"
                                )
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor="disease-detection"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Disease Detection
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="crop-suggestion"
                          checked={selectedActivityTypes.includes(
                            "crop-suggestion"
                          )}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedActivityTypes([
                                ...selectedActivityTypes,
                                "crop-suggestion",
                              ]);
                            } else {
                              setSelectedActivityTypes(
                                selectedActivityTypes.filter(
                                  (type) => type !== "crop-suggestion"
                                )
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor="crop-suggestion"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Crop Suggestions
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="chatbot"
                          checked={selectedActivityTypes.includes("chatbot")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedActivityTypes([
                                ...selectedActivityTypes,
                                "chatbot",
                              ]);
                            } else {
                              setSelectedActivityTypes(
                                selectedActivityTypes.filter(
                                  (type) => type !== "chatbot"
                                )
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor="chatbot"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          AI Chatbot
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="account"
                          checked={selectedActivityTypes.includes("account")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedActivityTypes([
                                ...selectedActivityTypes,
                                "account",
                              ]);
                            } else {
                              setSelectedActivityTypes(
                                selectedActivityTypes.filter(
                                  (type) => type !== "account"
                                )
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor="account"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Account Activity
                        </Label>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activity List */}
            <div className="space-y-8">
              {Object.keys(groupedActivities).length > 0 ? (
                Object.keys(groupedActivities)
                  .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
                  .map((dateKey) => (
                    <div key={dateKey}>
                      <h2 className="text-lg font-medium text-primary mb-4">
                        {formatDate(dateKey)}
                      </h2>
                      <div className="space-y-4">
                        {groupedActivities[dateKey].map((activity) => (
                          <Card
                            key={activity.id}
                            className="border-border shadow-sm overflow-hidden"
                          >
                            <Tabs defaultValue="summary" className="w-full">
                              <div className="flex items-center justify-between p-4 border-b border-border">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center mr-3 flex-shrink-0">
                                    {activity.icon}
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-primary">
                                      {activity.title}
                                    </h3>
                                    <p className="text-sm text-primary">
                                      {activity.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  {getActivityTypeBadge(activity.type)}
                                  <p className="text-xs text-primary/80">
                                    {new Date(activity.date).toLocaleTimeString(
                                      "en-US",
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      }
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="px-4 py-2 bg-green-50 border-b border-border">
                                <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                                  <TabsTrigger
                                    value="summary"
                                    className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-none"
                                  >
                                    Summary
                                  </TabsTrigger>
                                  <TabsTrigger
                                    value="details"
                                    className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-none"
                                  >
                                    Details
                                  </TabsTrigger>
                                </TabsList>
                              </div>
                              <TabsContent value="summary" className="p-4 m-0">
                                <div className="text-sm text-primary/80">
                                  <p>{activity.description}</p>
                                  <p className="mt-2 text-primary">
                                    {new Date(activity.date).toLocaleString(
                                      "en-US",
                                      {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      }
                                    )}
                                  </p>
                                </div>
                              </TabsContent>
                              <TabsContent value="details" className="p-4 m-0">
                                <div className="text-sm">
                                  {activity.type === "disease-detection" && (
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-primary">
                                          Confidence:
                                        </span>
                                        <span className="text-primary font-medium">
                                          {activity.details.confidence}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-primary">
                                          Treatment:
                                        </span>
                                        <span className="text-primary">
                                          {activity.details.treatment}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-primary">
                                          Location:
                                        </span>
                                        <span className="text-primary">
                                          {activity.details.location}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                  {activity.type === "crop-suggestion" && (
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-primary">
                                          Top Recommendation:
                                        </span>
                                        <span className="text-primary font-medium">
                                          {activity.details.topRecommendation}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-primary">
                                          Match Percentage:
                                        </span>
                                        <span className="text-primary">
                                          {activity.details.matchPercentage}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-primary">
                                          Other Options:
                                        </span>
                                        <span className="text-primary">
                                          {activity.details.otherOptions?.join(
                                            ", "
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                  {activity.type === "chatbot" && (
                                    <div className="space-y-2">
                                      <div>
                                        <span className="text-primary">
                                          Question:
                                        </span>
                                        <p className="text-primary mt-1">
                                          {activity.details.question}
                                        </p>
                                      </div>
                                      <div className="mt-3">
                                        <span className="text-primary">
                                          Answer:
                                        </span>
                                        <p className="text-primary mt-1">
                                          {activity.details.answer}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                  {activity.type === "account" && (
                                    <div className="space-y-2">
                                      {activity.details.changedFields && (
                                        <div className="flex justify-between">
                                          <span className="text-primary">
                                            Changed Fields:
                                          </span>
                                          <span className="text-primary">
                                            {activity.details.changedFields?.join(
                                              ", "
                                            )}
                                          </span>
                                        </div>
                                      )}
                                      {activity.details.method && (
                                        <div className="flex justify-between">
                                          <span className="text-primary">
                                            Method:
                                          </span>
                                          <span className="text-primary">
                                            {activity.details.method}
                                          </span>
                                        </div>
                                      )}
                                      {activity.details.device && (
                                        <div className="flex justify-between">
                                          <span className="text-primary">
                                            Device:
                                          </span>
                                          <span className="text-primary">
                                            {activity.details.device}
                                          </span>
                                        </div>
                                      )}
                                      {activity.details.location && (
                                        <div className="flex justify-between">
                                          <span className="text-primary">
                                            Location:
                                          </span>
                                          <span className="text-primary">
                                            {activity.details.location}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </TabsContent>
                            </Tabs>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))
              ) : (
                <Card className="border-border shadow-sm">
                  <CardContent className="p-6 text-center">
                    <Info className="h-12 w-12 text-primary/80 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-primary mb-2">
                      No activities found
                    </h3>
                    <p className="text-primary">
                      No activities match your current filters. Try adjusting
                      your search or filters.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
