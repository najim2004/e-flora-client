import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Scissors,
  TrendingUp,
} from "lucide-react";
import { Crop } from "@/types/cropDetails";

interface RelatedResourcesProps {
  crop: Crop;
}

const RelatedResources: React.FC<RelatedResourcesProps> = ({ crop }) => {
  return (
    <Card className="border-green-100 shadow-sm mt-8">
      <CardHeader>
        <CardTitle className="text-primary">Related Resources</CardTitle>
        <CardDescription className="text-primary/80">
          Additional information and resources for {crop.name} cultivation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-green-100">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                <h3 className="font-medium text-primary">
                  Common Problems
                </h3>
              </div>
              <p className="text-sm text-primary/80 mb-3">
                Learn about common problems faced during {crop.name} cultivation
                and how to address them.
              </p>
              <Button variant="link" className="text-green-600 p-0">
                View Problems & Solutions
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-medium text-primary">
                  Success Stories
                </h3>
              </div>
              <p className="text-sm text-primary/80 mb-3">
                Read success stories from farmers who have achieved high yields
                with {crop.name}.
              </p>
              <Button variant="link" className="text-green-600 p-0">
                Read Success Stories
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <Scissors className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-medium text-primary">
                  Variety Selection
                </h3>
              </div>
              <p className="text-sm text-primary/80 mb-3">
                Compare different varieties of {crop.name} and choose the best
                one for your conditions.
              </p>
              <Button variant="link" className="text-green-600 p-0">
                Compare Varieties
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedResources;
