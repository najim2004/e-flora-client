'use client';

import type React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sun,
  Droplets,
  Clock,
  Plus,
  Loader,
  Leaf,
  Thermometer,
  AlertCircle,
} from 'lucide-react';
import type { CropCardType } from '@/types/cropSuggestion';

interface CropCardProps {
  crop: CropCardType;
  loadings: string[];
  onAddToGarden: (cropId: string) => void;
}

const CropCard: React.FC<CropCardProps> = ({
  crop,
  loadings,
  onAddToGarden,
}) => {
  return (
    <Card className="group flex flex-col h-full hover:shadow-xl transition-all duration-300 border-0 bg-card shadow-sm hover:scale-[1.02] overflow-hidden pt-0 rounded-md !rounded-tl-[60px] !rounded-br-[60px] gap-2">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          {crop?.image?.url && crop.image.index !== "default_image" ? (
            <Image
              src={crop.image.url}
              alt={crop.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-muted/50">
              <div className="text-center text-muted-foreground">
                <Leaf className="h-12 w-12 mx-auto mb-2" />
                <span className="text-lg font-medium">Image Not Available</span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-4 right-4">
            <Badge
              className={`bg-background text-primary shadow-lg backdrop-blur-sm`}
            >
              {crop.difficulty}
            </Badge>
          </div>
        </div>
        <div className="p-4 pb-2">
          <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {crop.name}
          </CardTitle>
          <p className="text-xs text-muted-foreground font-medium italic mt-1">
            {crop.scientificName}
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 flex-grow space-y-2">
        <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {crop.description}
        </CardDescription>

        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-foreground flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-primary" />
            Growing Conditions
          </h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
              <Sun className="h-5 w-5 text-amber-500 mb-1" />
              <span className="text-xs font-medium text-center text-foreground">
                {crop.sunlight}
              </span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
              <Droplets className="h-5 w-5 text-blue-500 mb-1" />
              <span className="text-xs font-medium text-center text-foreground">
                {crop.waterNeed}
              </span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
              <Clock className="h-5 w-5 text-green-500 mb-1" />
              <span className="text-xs font-medium text-center text-foreground">
                {crop.maturityTime}
              </span>
            </div>
          </div>
        </div>

        {crop.features && crop.features.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-foreground flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" />
              Key Features
            </h4>
            <div className="flex flex-wrap gap-1">
              {crop.features.slice(0, 3).map((feature, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs px-2 py-1"
                >
                  {feature}
                </Badge>
              ))}
              {crop.features.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{crop.features.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            disabled={crop.details.status !== "success"}
            size="sm"
            className="flex-1"
          >
            {crop.details.status === "success" ? (
              "Learn More"
            ) : crop.details.status === "failed" ? (
              <>
                <AlertCircle className="h-4 w-4 mr-1" />
                Failed
              </>
            ) : (
              <>
                <Loader className="h-4 w-4 mr-1 animate-spin" />
                Loading...
              </>
            )}
          </Button>

          <Button
            size="sm"
            disabled={
              crop.details.status === "pending" || loadings.includes(crop._id)
            }
            onClick={() =>
              crop?.details?.status === "success" && onAddToGarden(crop._id)
            }
            className="flex-1"
          >
            {loadings.includes(crop._id) ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Add to Garden
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CropCard;