// First import these additional components
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CropSuggestionStatus } from "@/types/cropSuggestion";

// Replace the existing progress display with this new component
const ProgressDisplay = ({
  status,
  progress,
  message,
  timestamp,
}: {
  status: CropSuggestionStatus;
  progress: number;
  message?: string;
  timestamp: Date;
}) => {
  const getStatusColor = (status: CropSuggestionStatus) => {
    switch (status) {
      case "initiated":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "analyzing":
        return "bg-blue-500 hover:bg-blue-600";
      case "generatingData":
        return "bg-indigo-500 hover:bg-indigo-600";
      case "savingToDB":
        return "bg-purple-500 hover:bg-purple-600";
      case "completed":
        return "bg-emerald-500 hover:bg-emerald-600";
      case "failed":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="w-full space-y-4 rounded-lg border border-green-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <Badge className={`${getStatusColor(status)} capitalize`}>
          {status}
        </Badge>
        <span className="text-xs text-gray-500">
          {new Date(timestamp).toLocaleTimeString()}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-green-700 font-medium">Progress</span>
          <span className="text-green-600">{progress}%</span>
        </div>
        <Progress
          value={progress}
          className="h-2 bg-green-100"
        />
      </div>

      {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
    </div>
  );
};

export default ProgressDisplay;
