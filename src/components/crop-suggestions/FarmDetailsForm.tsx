import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface FarmDetailsFormProps {
  location: string;
  soilType: string;
  farmSize: string;
  irrigation: string;
  onLocationChange: (value: string) => void;
  onSoilTypeChange: (value: string) => void;
  onFarmSizeChange: (value: string) => void;
  onIrrigationChange: (value: string) => void;
  onSubmit: () => void;
}

export default function FarmDetailsForm({
  location,
  soilType,
  farmSize,
  irrigation,
  onLocationChange,
  onSoilTypeChange,
  onFarmSizeChange,
  onIrrigationChange,
  onSubmit,
}: FarmDetailsFormProps) {
  return (
    <form className="space-y-6" onSubmit={(e) => {e.preventDefault(); onSubmit();}}>
      <div className="space-y-2">
        <Label htmlFor="location" className="text-green-700">
          Location
        </Label>
        <div className="relative">
          <Input
            id="location"
            placeholder="Enter your location"
            className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
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
        <Select value={soilType} onValueChange={onSoilTypeChange}>
          <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500 w-full">
            <SelectValue placeholder="Select soil type">{soilType}</SelectValue>
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
          value={farmSize}
          onChange={(e) => onFarmSizeChange(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="irrigation" className="text-green-700">
          Irrigation Availability
        </Label>
        <Select value={irrigation} onValueChange={onIrrigationChange}>
          <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500 w-full">
            <SelectValue placeholder="Select availability">{irrigation}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full irrigation</SelectItem>
            <SelectItem value="partial">Partial irrigation</SelectItem>
            <SelectItem value="rainfed">Rainfed only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full bg-green-600 hover:bg-green-700" type="submit">
        Get Recommendations
      </Button>
    </form>
  );
}
