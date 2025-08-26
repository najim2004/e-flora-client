import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface Task {
  crop: string;
  task: string;
  time: string;
}

interface TodaysTasksProps {
  tasks: Task[];
}

export default function TodaysTasks({ tasks }: TodaysTasksProps) {
  return (
    <Card className="bg-white border-green-200 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Calendar className="h-5 w-5" /> Today&#39;s Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
            >
              <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">{task.task}</p>
                <p className="text-xs text-green-600">
                  {task.crop} • {task.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button asChild className="w-full mt-4 bg-green-600 hover:bg-green-700">
          <Link href="/calendar">View Full Calendar</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
