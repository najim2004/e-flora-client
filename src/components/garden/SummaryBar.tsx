import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Calendar, Trash2 } from "lucide-react";

interface SummaryBarProps {
  active: number;
  pending: number;
  removed: number;
}

export default function SummaryBar({ active, pending, removed }: SummaryBarProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <Card className="bg-white border-green-200 shadow-md p-0">
        <CardContent className="p-3 md:p-6">
          <div className="flex items-center justify-between">
            <div className="text-center w-full md:text-start">
              <p className="text-sm font-medium text-green-600">Active Crops</p>
              <p className="text-3xl font-bold text-green-800">{active}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-xl hidden md:flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white border-yellow-200 shadow-md p-0">
        <CardContent className="p-3 md:p-6">
          <div className="flex items-center justify-between">
            <div className="text-center w-full md:text-start">
              <p className="text-sm font-medium text-yellow-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-800">{pending}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-xl hidden md:flex items-center justify-center">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white border-gray-200 shadow-md p-0">
        <CardContent className="p-3 md:p-6">
          <div className="flex items-center justify-between">
            <div className="text-center w-full md:text-start">
              <p className="text-sm font-medium text-gray-600">Removed</p>
              <p className="text-3xl font-bold text-gray-800">{removed}</p>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-xl hidden md:flex items-center justify-center">
              <Trash2 className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
