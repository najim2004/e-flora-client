import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  MapPin,
  Cloud,
  Droplets,
  Thermometer,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CropSuggestionsPage() {
  return (
    <div className="min-h-screen bg-green-50">  
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
          Smart Crop Suggestions
        </h1>
        <p className="text-lg text-green-700 mb-8">
          Get personalized crop recommendations based on your location, soil
          type, and current weather conditions.
        </p> */}

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-green-100 shadow-sm md:col-span-1">
            <CardHeader>
              <CardTitle className="text-green-800">
                Enter Your Details
              </CardTitle>
              <CardDescription className="text-green-700">
                Provide information about your farm location and soil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-green-700">
                    Location
                  </Label>
                  <div className="relative">
                    <Input
                      id="location"
                      placeholder="Enter your location"
                      className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-2 border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Use Current Location
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soil-type" className="text-green-700">
                    Soil Type
                  </Label>
                  <Select>
                    <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500 w-full">
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
                  <Label htmlFor="farm-size" className="text-green-700">
                    Farm Size (Acres)
                  </Label>
                  <Input
                    id="farm-size"
                    type="number"
                    placeholder="Enter farm size"
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="irrigation" className="text-green-700">
                    Irrigation Availability
                  </Label>
                  <Select>
                    <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500 w-full">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full irrigation</SelectItem>
                      <SelectItem value="partial">
                        Partial irrigation
                      </SelectItem>
                      <SelectItem value="rainfed">Rainfed only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Get Recommendations
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="text-green-800">
                Crop Recommendations
              </CardTitle>
              <CardDescription className="text-green-700">
                Based on your location and soil conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8 p-4 bg-green-100 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">
                  Current Weather Conditions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <Thermometer className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm text-green-700">Temperature</p>
                      <p className="font-medium text-green-800">28°C</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Droplets className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm text-green-700">Humidity</p>
                      <p className="font-medium text-green-800">65%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Cloud className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm text-green-700">Rainfall</p>
                      <p className="font-medium text-green-800">120mm/month</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm text-green-700">Location</p>
                      <p className="font-medium text-green-800">
                        Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="font-medium text-green-800 mb-4">
                Recommended Crops
              </h3>

              <div className="space-y-4">
                <Card className="border-green-100">
                  <CardContent className="p-4 flex items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Rice"
                        className="h-10 w-10"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-green-800">
                        Rice (Boro)
                      </h4>
                      <p className="text-sm text-green-700">
                        Ideal for your clay soil and current weather conditions
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="h-1.5 w-full max-w-[100px] bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: "95%" }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs text-green-700">
                          95% match
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="ml-4 border-green-600 text-green-600 hover:bg-green-50"
                    >
                      Details <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardContent className="p-4 flex items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Jute"
                        className="h-10 w-10"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-green-800">Jute</h4>
                      <p className="text-sm text-green-700">
                        Good for your soil type and current rainfall patterns
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="h-1.5 w-full max-w-[100px] bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs text-green-700">
                          85% match
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="ml-4 border-green-600 text-green-600 hover:bg-green-50"
                    >
                      Details <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardContent className="p-4 flex items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Mustard"
                        className="h-10 w-10"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-green-800">Mustard</h4>
                      <p className="text-sm text-green-700">
                        Suitable for the upcoming season and your soil
                        conditions
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="h-1.5 w-full max-w-[100px] bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs text-green-700">
                          80% match
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="ml-4 border-green-600 text-green-600 hover:bg-green-50"
                    >
                      Details <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-green-800 mb-2">
                  Cultivation Tips
                </h3>
                <Card className="border-green-100">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-green-800 mb-2">
                      Rice (Boro) Cultivation
                    </h4>
                    <ul className="space-y-2 text-green-700 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Best planting time: December-January</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Seed rate: 20-25 kg/acre</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>
                          Fertilizer recommendation: N:P:K at 80:40:40 kg/acre
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>
                          Water management: Maintain 2-3 cm water level during
                          vegetative stage
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
