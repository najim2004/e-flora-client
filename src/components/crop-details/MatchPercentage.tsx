"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Progress } from "@/components/ui/progress";

interface MatchPercentageProps {
  cropName: string;
}

const MatchPercentage: React.FC<MatchPercentageProps> = ({ cropName }) => {
  const searchParams = useSearchParams();
  const match = searchParams.get('match');

  if (!match) {
    return null;
  }

  const matchPercentage = parseInt(match);

  return (
    <div className="flex items-center mb-4">
      <div className="mr-2 text-sm font-medium text-green-700">
        Match for your farm:
      </div>
      <div className="flex-1 flex items-center">
        <Progress
          value={matchPercentage}
          className="h-2 bg-green-100"
        />
        <span className="ml-2 text-sm font-medium text-green-700">
          {matchPercentage}%
        </span>
      </div>
    </div>
  );
};

export default MatchPercentage;
