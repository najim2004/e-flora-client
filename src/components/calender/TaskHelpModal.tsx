import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Task, taskTypes } from "@/types/calender";
import { LifeBuoy, X } from "lucide-react";

interface TaskHelpModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskHelpModal({
  task,
  isOpen,
  onClose,
}: TaskHelpModalProps) {
  if (!task) return null;

  const taskConfig = taskTypes[task.type];
  const TaskIcon = taskConfig.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-green-200">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-12 h-12 rounded-full ${taskConfig.color} flex items-center justify-center flex-shrink-0`}
            >
              <TaskIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-lg text-green-800">
                {task.task}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                {task.crop} - {taskConfig.label}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {taskConfig.helpText}
          </p>
        </div>

        <DialogFooter className="sm:justify-start gap-2">
          <Button
            type="button"
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            onClick={() => alert("Agent functionality will be added soon!")}
          >
            <LifeBuoy className="h-4 w-4 mr-2" />
            Contact Agent
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={onClose}
          >
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
