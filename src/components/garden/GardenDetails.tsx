import Image from "next/image";
import type { Garden } from "@/types/Garden";
import clsx from "clsx";
import {
  MapPin,
  Info,
  Sun,
  Sprout,
  Landmark,
  Droplet,
  NotebookPen,
  User,
  LayoutTemplate
} from "lucide-react";

/**
 * Beautiful garden personal details component, with icons and well-grouped layout for maximum professional feel.
 * Garden size is displayed in square feet (ft²).
 */
interface GardenDetailsProps {
  garden: Partial<Garden> & Pick<Garden, "name">;
  className?: string;
}

const labelClass = "flex items-center gap-1 text-xs uppercase tracking-wide text-green-600 font-semibold mb-0.5";
const valueClass = "block text-base text-gray-700";
const placeholderValue = <span className="italic text-gray-400">Not set</span>;

function getSizeSqft(sizeSqm?: number | null) {
  if (typeof sizeSqm !== "number" || isNaN(sizeSqm)) return placeholderValue;
  const sqft = sizeSqm * 10.7639;
  return `${sqft.toLocaleString(undefined, { maximumFractionDigits: 2 })} ft²`;
}

export default function GardenDetails({ garden, className }: GardenDetailsProps) {
  // Compose location line, or placeholder if none
  const location = garden.location;
  const locationFragments = [
    location?.city,
    location?.state,
    location?.country,
    location?.zipCode
  ].filter(Boolean);
  const locationLine = locationFragments.length ? locationFragments.join(", ") : null;

  return (
    <section
      className={clsx(
        "bg-white rounded-xl shadow-md overflow-hidden mb-8",
        className
      )}
      aria-label="Garden details"
    >
      {/* Banner Image */}
      <div className="relative w-full h-56 sm:h-60 md:h-72 lg:h-80 bg-green-50">
        <Image
          src={garden.image?.url || "/banner-placeholder.svg"}
          alt={`Banner for ${garden.name}`}
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-green-900/70 to-transparent p-6">
          <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
            {garden.name || <span className="italic text-gray-300">No name</span>}
          </h1>
        </div>
      </div>
      {/* Details Section */}
      <div className="p-4 sm:p-6 flex flex-col gap-6">
        {/* Location */}
        <div className="flex flex-col gap-1">
          <span className={labelClass}><MapPin size={16} /> Location</span>
          <span className={valueClass}>{locationLine || placeholderValue}</span>
        </div>
        {/* Description */}
        <div className="flex flex-col gap-1">
          <span className={labelClass}><Info size={16} /> Description</span>
          <span className="text-green-800 text-base md:text-lg whitespace-pre-line">{garden.description || placeholderValue}</span>
        </div>
        {/* Grouped grid for main details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <span className={labelClass}><Landmark size={16} /> Type</span>
            <span className={valueClass}>{garden.gardenType || placeholderValue}</span>
          </div>
          <div>
            <span className={labelClass}><LayoutTemplate size={16} /> Size</span>
            <span className={valueClass}>{getSizeSqft(garden.size)}</span>
          </div>
          <div>
            <span className={labelClass}><Sun size={16} /> Sunlight</span>
            <span className={valueClass + " capitalize"}>{garden.sunlight || placeholderValue}</span>
          </div>
          <div>
            <span className={labelClass}><Sprout size={16} /> Soil Types</span>
            <span className={valueClass}>{garden.soilType && garden.soilType.length > 0 ? garden.soilType.join(", ") : placeholderValue}</span>
          </div>
          <div>
            <span className={labelClass}><Landmark size={16} /> Purpose</span>
            <span className={valueClass + " capitalize"}>{garden.purpose || placeholderValue}</span>
          </div>
          <div>
            <span className={labelClass}><Droplet size={16} /> Water Source</span>
            <span className={valueClass + " capitalize"}>{garden.waterSource || placeholderValue}</span>
          </div>
          <div>
            <span className={labelClass}><User size={16} /> Gardener Type</span>
            <span className={valueClass + " capitalize"}>{garden.gardenerType || placeholderValue}</span>
          </div>
        </div>
      </div>
      {/* Notes block, visually separated and at the bottom */}
      <div className="p-4 sm:p-6 pt-0 border-t border-green-100 bg-green-50 flex flex-col gap-1">
        <span className={clsx(labelClass, "text-green-700")}> <NotebookPen size={16} /> Notes</span>
        <span className={clsx(valueClass, "")}>{garden.notes || placeholderValue}</span>
      </div>
    </section>
  );
}
