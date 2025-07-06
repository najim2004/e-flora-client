import { Droplets, Leaf, Heart, CalendarIcon } from "lucide-react";

export const taskTypes = {
  water: {
    icon: Droplets,
    color: "bg-blue-500",
    label: "Water",
    lightColor: "bg-blue-50 text-blue-800",
    helpText:
      "Ensure the soil is moist but not waterlogged. Water at the base of the plant to avoid wetting the leaves, which can encourage fungal diseases. Early morning is the best time to water.",
  },
  fertilize: {
    icon: Leaf,
    color: "bg-green-500",
    label: "Fertilize",
    lightColor: "bg-green-50 text-green-800",
    helpText:
      "Apply a balanced fertilizer according to the package instructions. Avoid over-fertilizing, as this can burn the roots. Water the plant well after applying fertilizer.",
  },
  diagnosis: {
    icon: Heart,
    color: "bg-red-500",
    label: "Check Health",
    lightColor: "bg-red-50 text-red-800",
    helpText:
      "Inspect leaves, stems, and soil for any signs of pests (like aphids or spider mites) or diseases (like powdery mildew or blight). Look for discoloration, spots, or wilting.",
  },
  harvest: {
    icon: CalendarIcon,
    color: "bg-yellow-500",
    label: "Harvest",
    lightColor: "bg-yellow-50 text-yellow-800",
    helpText:
      "Harvest crops when they are at their peak ripeness. Use clean, sharp tools to avoid damaging the plant. Harvest in the morning for the best flavor and freshness.",
  },
  maintenance: {
    icon: CalendarIcon,
    color: "bg-purple-500",
    label: "Maintenance",
    lightColor: "bg-purple-50 text-purple-800",
    helpText:
      "This includes tasks like pruning dead leaves, weeding around the plants, and checking support structures like stakes or cages. Regular maintenance keeps plants healthy and productive.",
  },
} as const;

export type TaskType = keyof typeof taskTypes;

export interface Task {
  id: number;
  crop: string;
  task: string;
  time: string;
  type: TaskType;
  completed: boolean;
}

export interface CalendarTasks {
  [date: string]: Task[];
}
